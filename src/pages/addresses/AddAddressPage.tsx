import { useEffect, useRef, useState, useCallback } from "react";
import { Box, Button, Flex, Text, ActionIcon } from "@mantine/core";
import {
  IconArrowLeft,
  IconCurrentLocation,
  IconChevronRight,
  IconMapPin,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import type { YMap } from "@yandex/ymaps3-types";
import classes from "./AddAddressPage.module.css";

const YANDEX_API_KEY = "392552b9-d06b-4ca4-b8a9-4a4b31cefed4";
const DEFAULT_CENTER: [number, number] = [69.240562, 41.311081]; // Tashkent [lng, lat]

export function AddAddressPage() {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<YMap | null>(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] =
    useState<[number, number]>(DEFAULT_CENTER);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [isMapMoving, setIsMapMoving] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const geocodeCoordinates = useCallback(async (coords: [number, number]) => {
    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_API_KEY}&geocode=${coords[0]},${coords[1]}&format=json&lang=ru_RU`
      );
      const data = await response.json();
      const geoObject =
        data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;
      if (geoObject) {
        const fullAddress =
          geoObject.metaDataProperty?.GeocoderMetaData?.text || geoObject.name;
        // Reverse the address parts order (from "Country, City, Street" to "Street, City, Country")
        const reversedAddress = fullAddress.split(", ").reverse().join(", ");
        setAddress(reversedAddress);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  }, []);

  const initMap = useCallback(async () => {
    if (!mapRef.current || !scriptLoaded || mapInstanceRef.current) return;

    try {
      await ymaps3.ready;

      const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapListener,
      } = ymaps3;

      const map = new YMap(mapRef.current, {
        location: {
          center: DEFAULT_CENTER,
          zoom: 16,
        },
      });

      map.addChild(new YMapDefaultSchemeLayer({}));
      map.addChild(new YMapDefaultFeaturesLayer({}));

      // Listen to map camera updates
      map.addChild(
        new YMapListener({
          onActionStart: () => {
            setIsMapMoving(true);
          },
          onActionEnd: () => {
            setIsMapMoving(false);
            const center = map.center;
            if (center) {
              setCoordinates(center as [number, number]);
              geocodeCoordinates(center as [number, number]);
            }
          },
        })
      );

      mapInstanceRef.current = map;
      geocodeCoordinates(DEFAULT_CENTER);
    } catch (error) {
      console.error("Map initialization error:", error);
    }
  }, [geocodeCoordinates, scriptLoaded]);

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src*="api-maps.yandex.ru/v3"]'
    );

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
      };
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      initMap();
    }
  }, [scriptLoaded, initMap]);

  const handleGpsClick = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Геолокация не поддерживается вашим браузером");
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Yandex Maps format: [longitude, latitude]
        const newCoords: [number, number] = [longitude, latitude];

        // Debug uchun - brauzer konsolida koordinatalarni ko'ring
        console.log("GPS coordinates received:", {
          latitude,
          longitude,
          yandexFormat: newCoords,
          accuracy: position.coords.accuracy,
        });

        // State va manzilni darhol yangilash
        setCoordinates(newCoords);
        geocodeCoordinates(newCoords);

        // Xaritani yangi joyga ko'chirish
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setLocation({
            center: newCoords,
            zoom: 17,
            duration: 500,
          });
        }

        setGpsLoading(false);
      },
      (error) => {
        console.error("GPS error:", error);
        let errorMessage = "Не удалось определить ваше местоположение";
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage =
            "Доступ к геолокации запрещён. Разрешите доступ в настройках браузера.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Информация о местоположении недоступна";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "Время ожидания истекло. Попробуйте ещё раз.";
        }
        alert(errorMessage);
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [geocodeCoordinates]);

  const handleSelectAddress = () => {
    // TODO: Save address and navigate back or to next step
    console.log("Selected address:", address);
    console.log("Selected coordinates:", coordinates);
    navigate(-1);
  };

  return (
    <Flex direction="column" className={classes.page}>
      {/* Map Container */}
      <Box className={classes.mapContainer}>
        <div ref={mapRef} className={classes.map} />

        {/* Fixed Center Marker */}
        <Box
          className={classes.centerMarker}
          data-moving={isMapMoving || undefined}
        >
          <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
            <path
              d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30C40 8.954 31.046 0 20 0z"
              fill="#E53935"
            />
            <circle cx="20" cy="20" r="8" fill="white" />
          </svg>
        </Box>

        {/* Back Button */}
        <ActionIcon
          variant="filled"
          color="white"
          size="lg"
          radius="xl"
          className={classes.backButton}
          onClick={() => navigate(-1)}
        >
          <IconArrowLeft size={22} color="var(--mantine-color-dark-9)" />
        </ActionIcon>

        {/* GPS Button */}
        <ActionIcon
          variant="filled"
          color="white"
          size="lg"
          radius="xl"
          className={classes.gpsButton}
          onClick={handleGpsClick}
          loading={gpsLoading}
        >
          <IconCurrentLocation size={20} color="var(--mantine-color-dark-6)" />
        </ActionIcon>
      </Box>

      {/* Bottom Sheet */}
      <Box className={classes.bottomSheet}>
        <Text className={classes.sheetTitle}>Адрес доставки</Text>

        <Flex
          className={classes.addressRow}
          align="center"
          gap={12}
          onClick={() => {
            // TODO: Open address search/edit
          }}
        >
          <Box className={classes.addressIcon}>
            <IconMapPin size={18} color="var(--mantine-color-gray-6)" />
          </Box>
          <Text className={classes.addressText} lineClamp={1}>
            {address || "Загрузка адреса..."}
          </Text>
          <IconChevronRight size={20} color="var(--mantine-color-gray-5)" />
        </Flex>

        <Button
          fullWidth
          size="lg"
          radius="xl"
          className={classes.selectButton}
          onClick={handleSelectAddress}
        >
          Выбрать этот адрес
        </Button>
      </Box>
    </Flex>
  );
}
