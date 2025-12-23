import { useState, useEffect, useCallback } from "react";
import { ActionIcon, Image } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import classes from "./Carousel.module.css";

interface Banner {
  id: string;
  image: string;
  alt: string;
  link?: string;
}

const banners: Banner[] = [
  {
    id: "1",
    image:
      "https://avatars.mds.yandex.net/get-feeds-media/3752156/fc424d00da4d7ca31ab3cbe7c8e6999b0dd3c8e8/media-984-312",
    alt: "Скидки до 50%",
    link: "/promo/sale",
  },
  {
    id: "2",
    image:
      "https://avatars.mds.yandex.net/get-grocery_goods/2750890/a1b2c3d4-e5f6-7890-abcd-ef1234567890/1520x480",
    alt: "Бесплатная доставка",
    link: "/promo/delivery",
  },
  {
    id: "3",
    image:
      "https://avatars.mds.yandex.net/get-grocery_goods/2750890/12345678-90ab-cdef-1234-567890abcdef/1520x480",
    alt: "Новогодние подарки",
    link: "/promo/newyear",
  },
];

interface CarouselProps {
  items?: Banner[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function Carousel({
  items = banners,
  autoPlay = true,
  autoPlayInterval = 5000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isHovered, goToNext]);

  const handleBannerClick = (banner: Banner) => {
    if (banner.link) {
      window.location.href = banner.link;
    }
  };

  return (
    <div
      className={classes.carousel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={classes.slidesContainer}>
        <div
          className={classes.slidesTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((banner) => (
            <div
              key={banner.id}
              className={classes.slide}
              onClick={() => handleBannerClick(banner)}
            >
              <Image
                src={banner.image}
                alt={banner.alt}
                className={classes.bannerImage}
                fallbackSrc="https://placehold.co/1520x480/ffe033/333333?text=Banner"
              />
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <>
          <ActionIcon
            className={`${classes.navButton} ${classes.prevButton}`}
            variant="white"
            size="lg"
            radius="xl"
            onClick={goToPrev}
          >
            <IconChevronLeft size={20} />
          </ActionIcon>

          <ActionIcon
            className={`${classes.navButton} ${classes.nextButton}`}
            variant="white"
            size="lg"
            radius="xl"
            onClick={goToNext}
          >
            <IconChevronRight size={20} />
          </ActionIcon>

          <div className={classes.dots}>
            {items.map((_, index) => (
              <button
                key={index}
                className={`${classes.dot} ${
                  index === currentIndex ? classes.dotActive : ""
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
