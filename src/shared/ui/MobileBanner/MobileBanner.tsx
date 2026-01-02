import { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import { Box, Image, Text } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import classes from "./MobileBanner.module.css";

interface Banner {
  id: string;
  image: string;
  alt: string;
  link?: string;
}

const banners: Banner[] = [
  {
    id: "1",
    image: "/banners/1.jpg",
    alt: "Новогодние подарки",
    link: "/promo/sale",
  },
  {
    id: "2",
    image: "/banners/2.jpg",
    alt: "Акция 1+1 на хлеб",
    link: "/promo/delivery",
  },
  {
    id: "3",
    image: "/banners/3.jpg",
    alt: "Всегда свежие продукты",
    link: "/promo/newyear",
  },
  {
    id: "3",
    image: "/banners/4.jpg",
    alt: "Большие скидки на мясо",
    link: "/promo/meat",
  },
];

interface CarouselProps {
  items?: Banner[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function MobileBannerCorusel({
  items = banners,
  autoPlay = true,
  autoPlayInterval = 4000,
}: CarouselProps) {
  const autoplay = useRef(
    Autoplay({ delay: autoPlayInterval, stopOnInteraction: true })
  );

  const handleBannerClick = (banner: Banner) => {
    if (banner.link) {
      window.location.href = banner.link;
    }
  };

  return (
    <Carousel
      slideSize="auto"
      slideGap={8}
      emblaOptions={{
        loop: true,
        align: "start",
        slidesToScroll: 3,
      }}
      withControls={false}
      style={{
        paddingLeft: "14px",
      }}
      plugins={autoPlay ? [autoplay.current] : []}
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.reset()}
    >
      {items.map((banner) => (
        <Carousel.Slide
          key={banner.id}
          onClick={() => handleBannerClick(banner)}
          style={{
            cursor: banner.link ? "pointer" : "default",
          }}
        >
          <Box
            style={{
              width: "118px",
              height: "118px",
              border: "2px solid var(--color-primary)",
              borderRadius: "12px",
              padding: "2px",
            }}
          >
            <Image
              src={banner.image}
              alt={banner.alt}
              className={classes.bannerImage}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
              fallbackSrc="https://placehold.co/1520x480/ffe033/333333?text=Banner"
            />
            <Text
              size="xs"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "12px",
                color: "white",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "14px",
              }}
            >
              {banner.alt}
            </Text>
          </Box>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
