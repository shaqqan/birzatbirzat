import { Outlet } from "react-router-dom";
import classes from "./MainLayout.module.css";

export function MainLayout() {
  return (
    <div className={classes.layout}>
      <Outlet />
    </div>
  );
}
