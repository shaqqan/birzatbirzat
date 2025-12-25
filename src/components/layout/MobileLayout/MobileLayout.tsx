import { Outlet } from "react-router-dom";
import classes from "./MobileLayout.module.css";

export function MobileLayout() {
  return (
    <div className={classes.layout}>
      <Outlet />
    </div>
  );
}
