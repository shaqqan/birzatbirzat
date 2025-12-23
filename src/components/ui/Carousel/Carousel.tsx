import { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
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
      "https://avatars.mds.yandex.net/get-feeds-media/5396768/5c6e67418f3d2269e99555d36170e65d3bb867ee/media-984-312",
    alt: "Бесплатная доставка",
    link: "/promo/delivery",
  },
  {
    id: "3",
    image:
      "https://avatars.mds.yandex.net/get-feeds-media/3752444/fc93a1e4b8037516ff213561ba868c472adc7942/media-984-312",
    alt: "Новогодние подарки",
    link: "/promo/newyear",
  },
];

interface CarouselProps {
  items?: Banner[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function BannerCarousel({
  items = banners,
  autoPlay = true,
  autoPlayInterval = 100,
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
      {items.map((banner) => (
        <Carousel.Slide
          key={banner.id}
          onClick={() => handleBannerClick(banner)}
          style={{ cursor: banner.link ? "pointer" : "default" }}
        >
          <Image
            src={banner.image}
            alt={banner.alt}
            className={classes.bannerImage}
            fallbackSrc="https://placehold.co/1520x480/ffe033/333333?text=Banner"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
