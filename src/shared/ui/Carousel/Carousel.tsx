import { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import { Image, Skeleton } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useSliderBanners } from "@/features/products";
import classes from "./Carousel.module.css";

// Helper to get text (prefer Russian, fallback to first available)
const getText = (text: Record<string, string> | null): string => {
  if (!text) return "";
  return text.ru || text.uz || Object.values(text)[0] || "";
};

interface CarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function BannerCarousel({
  autoPlay = true,
  autoPlayInterval = 4000,
}: CarouselProps) {
  const { data: banners, isLoading } = useSliderBanners();

  const autoplay = useRef(
    Autoplay({ delay: autoPlayInterval, stopOnInteraction: true })
  );

  const handleBannerClick = (link: string | null) => {
    if (link) {
      window.location.href = link;
    }
  };

  if (isLoading) {
    return (
      <div className={classes.skeletonContainer}>
        <Skeleton height={300} radius="md" />
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <Carousel
      slideSize="70%"
      emblaOptions={{
        loop: true,
      }}
      slideGap="md"
      classNames={classes}
      plugins={autoPlay ? [autoplay.current] : []}
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.reset()}
    >
      {banners.map((banner) => (
        <Carousel.Slide
          key={banner.id}
          onClick={() => handleBannerClick(banner.link)}
          style={{ cursor: banner.link ? "pointer" : "default" }}
        >
          <Image
            src={banner.image}
            alt={getText(banner.title)}
            className={classes.bannerImage}
            fallbackSrc="https://placehold.co/1520x480/ffe033/333333?text=Banner"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
