import { useEffect, useRef, useState, useCallback } from "react";
import { Modal, Button, TextInput, ActionIcon, LoadingOverlay } from "@mantine/core";
import { IconMapPin, IconCurrentLocation } from "@tabler/icons-react";
import type { YMap, YMapMarker } from "@yandex/ymaps3-types";
import classes from "./AddressModal.module.css";

interface AddressModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm?: (address: string, coordinates: [number, number]) => void;
}

const YANDEX_API_KEY = "392552b9-d06b-4ca4-b8a9-4a4b31cefed4";
const DEFAULT_CENTER: [number, number] = [69.240562, 41.311081]; // Tashkent [lng, lat]

export const AddressModal = ({ opened, onClose, onConfirm }: AddressModalProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<YMap | null>(null);
  const markerRef = useRef<YMapMarker | null>(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<[number, number]>(DEFAULT_CENTER);
  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const geocodeCoordinates = useCallback(async (coords: [number, number]) => {
    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_API_KEY}&geocode=${coords[0]},${coords[1]}&format=json&lang=ru_RU`
      );
      const data = await response.json();
      const geoObject = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;
      if (geoObject) {
        setAddress(geoObject.metaDataProperty?.GeocoderMetaData?.text || geoObject.name);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  }, []);

  const updateMarkerPosition = useCallback((coords: [number, number]) => {
    if (markerRef.current && mapInstanceRef.current) {
      markerRef.current.update({ coordinates: coords });
    }
  }, []);

  const initMap = useCallback(async () => {
    if (!mapRef.current || !scriptLoaded || mapInstanceRef.current) return;

    try {
      await ymaps3.ready;

      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls, YMapListener } = ymaps3;
      const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import("@yandex/ymaps3-controls@0.0.1");

      const map = new YMap(mapRef.current, {
        location: {
          center: coordinates,
          zoom: 15,
        },
      });

      map.addChild(new YMapDefaultSchemeLayer({}));
      map.addChild(new YMapDefaultFeaturesLayer({}));

      // Add zoom controls
      map.addChild(
        new YMapControls({ position: "right" }).addChild(new YMapZoomControl({}))
      );

      // Add geolocation control
      map.addChild(
        new YMapControls({ position: "bottom right" }).addChild(
          new YMapGeolocationControl({
            onGeolocatePosition: (position) => {
              const newCoords: [number, number] = [position[0], position[1]];
              setCoordinates(newCoords);
              updateMarkerPosition(newCoords);
              geocodeCoordinates(newCoords);
            },
          })
        )
      );

      // Create marker element
      const markerElement = document.createElement("div");
      markerElement.innerHTML = `
        <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30C40 8.954 31.046 0 20 0z" fill="#E53935"/>
          <circle cx="20" cy="20" r="8" fill="white"/>
        </svg>
      `;
      markerElement.style.cssText = "transform: translate(-50%, -100%); cursor: pointer;";

      const marker = new YMapMarker(
        { coordinates, draggable: true },
        markerElement
      );
      map.addChild(marker);
      markerRef.current = marker;

      // Listen to map camera updates
      map.addChild(
        new YMapListener({
          onActionEnd: () => {
            const center = map.center;
            if (center) {
              setCoordinates(center as [number, number]);
              updateMarkerPosition(center as [number, number]);
              geocodeCoordinates(center as [number, number]);
            }
          },
        })
      );

      mapInstanceRef.current = map;
      setMapLoading(false);
      geocodeCoordinates(coordinates);
    } catch (error) {
      console.error("Map initialization error:", error);
      setMapLoading(false);
    }
  }, [coordinates, geocodeCoordinates, scriptLoaded, updateMarkerPosition]);

  useEffect(() => {
    if (!opened) return;

    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru/v3"]');

    if (existingScript && typeof ymaps3 !== "undefined") {
      setScriptLoaded(true);
      return;
    }

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/v3/?apikey=${YANDEX_API_KEY}&lang=ru_RU`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => {
        console.error("Failed to load Yandex Maps script");
        setMapLoading(false);
      };
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [opened]);

  useEffect(() => {
    if (scriptLoaded && opened) {
      initMap();
    }
  }, [scriptLoaded, opened, initMap]);

  const handleGpsClick = () => {
    if (!navigator.geolocation) {
      alert("Геолокация не поддерживается вашим браузером");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoords: [number, number] = [longitude, latitude]; // ymaps3 uses [lng, lat]
        setCoordinates(newCoords);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.setLocation({
            center: newCoords,
            zoom: 17,
            duration: 300,
          });
        }
        updateMarkerPosition(newCoords);
        geocodeCoordinates(newCoords);
        setLoading(false);
      },
      (error) => {
        console.error("GPS error:", error);
        alert("Не удалось определить ваше местоположение");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleConfirm = () => {
    // Convert back to [lat, lng] for the callback
    onConfirm?.(address, [coordinates[1], coordinates[0]]);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Адрес доставки"
      size={1024}
      radius="lg"
      centered
      styles={{
        title: { fontWeight: 700, fontSize: 24 },
        content: {
          borderRadius: 32,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
          padding: 0,
          maxWidth: 1024,
          width: "100%",
          height: "auto",
        },
      }}
    >
      <div className={classes.modalContent}>
        <TextInput
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Адрес доставки"
          leftSection={<IconMapPin size={18} />}
          radius="md"
          size="md"
          className={classes.addressInput}
        />

        <div className={classes.mapContainer}>
          <LoadingOverlay visible={mapLoading} />
          <div ref={mapRef} className={classes.map} />
          <ActionIcon
            variant="filled"
            size="lg"
            radius="xl"
            className={classes.gpsButton}
            onClick={handleGpsClick}
            loading={loading}
          >
            <IconCurrentLocation size={20} />
          </ActionIcon>
        </div>

        <Button
          size="md"
          radius="md"
          className={classes.confirmButton}
          onClick={handleConfirm}
        >
          Подтвердить
        </Button>
      </div>
    </Modal>
  );
};
