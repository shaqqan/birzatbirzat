import { Link, useLocation } from "react-router-dom";
import classes from "./BottomNavbar.module.css";
import {
  IconHome,
  IconCategory,
  IconShoppingCart,
  IconHeart,
  IconUser,
} from "@tabler/icons-react";

const navlinks = [
  {
    label: "Главная",
    icon: IconHome,
    path: "/",
  },
  {
    label: "Каталог",
    icon: IconCategory,
    path: "/catalog",
  },
  {
    label: "Корзина",
    icon: IconShoppingCart,
    path: "/cart",
  },
  {
    label: "Избранное",
    icon: IconHeart,
    path: "/favorites",
  },
  {
    label: "Профиль",
    icon: IconUser,
    path: "/profile",
  },
];

export function BottomNavbar() {
  const location = useLocation();

  return (
    <div className={classes.footer}>
      <div className={classes.bottomNavbar}>
        <div className={classes.root}>
          {navlinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`${classes.item} ${isActive ? classes.active : ""}`}
              >
                <Icon className={classes.icon} size={24} stroke={1.5} />
                <span className={classes.label}>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
