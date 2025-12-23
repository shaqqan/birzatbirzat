import { Link } from "react-router-dom";
import classes from "./BottomNavbar.module.css";
import { useDevice } from "@/hooks/useDevice";

export function BottomNavbar() {
  const { isMobile } = useDevice();
  if (!isMobile) {
    return null;
  }
  const navlinks = [
    {
      label: "🏠 Главное меню",
      icon: "/icons/bottom-navbar/shop.svg",
      path: "/",
    },
    {
      label: "⭐ Избранное",
      icon: "/icons/bottom-navbar/shop.svg",
      path: "/favorites",
    },
    {
      label: "Profile",
      icon: "/icons/bottom-navbar/shop.svg",
      path: "/profile",
    },
    {
      label: "Cart",
      icon: "/icons/bottom-navbar/shop.svg",
      path: "/cart",
    },
  ];

  return (
    <div className={classes.bottomNavbar}>
      <div className={classes.root}>
        {navlinks.map((link) => (
          <Link to={link.path} className={classes.item}>
            <img src={link.icon} alt={link.label} className={classes.icon} />
            <span className={classes.label}>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
