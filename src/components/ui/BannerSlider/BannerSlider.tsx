import { ScrollArea } from "@mantine/core";
import classes from "./BannerSlider.module.css";

export interface BannerItem {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  backgroundColor?: string;
}

export interface BannerSliderProps {
  items: BannerItem[];
  onBannerClick?: (id: string) => void;
}

export function BannerSlider({ items, onBannerClick }: BannerSliderProps) {
  return (
    <ScrollArea
      scrollbarSize={0}
      type="never"
      className={classes.root}
    >
      <div className={classes.track}>
        {items.map((item) => (
          <button
            key={item.id}
            className={classes.banner}
            style={{ backgroundColor: item.backgroundColor || "#F5F5F5" }}
            onClick={() => onBannerClick?.(item.id)}
          >
            <img src={item.image} alt={item.title} className={classes.image} />
            <div className={classes.overlay}>
              <span className={classes.title}>{item.title}</span>
              {item.subtitle && (
                <span className={classes.subtitle}>{item.subtitle}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
