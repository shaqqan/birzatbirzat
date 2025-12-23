import { Outlet, useLocation } from "react-router-dom";
import classes from "./DesktopLayout.module.css";
import { Header } from "./Header/Header";
import { Catalog } from "./Catalog/Catalog";
import { Basket } from "./Basket/Basket";
import { Footer } from "@/components/ui";
import { Grid } from "@mantine/core";

export function DesktopLayout() {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <div className={classes.layout}>

      <div
        className={`${classes.container} ${
          isCheckoutPage ? classes.fullWidth : ""
        }`}
      >
        <Header />
        <Grid>
          <Grid.Col span={2}>
            {!isCheckoutPage && (
              <div className={classes.navbar}>
                <Catalog />
              </div>
            )}
          </Grid.Col>

          <Grid.Col span={8}>
            <div className={classes.main}>
              <Outlet />
            </div>
          </Grid.Col>

          <Grid.Col span={2}>
            {!isCheckoutPage && (
              <div className={classes.aside}>
                <Basket />
              </div>
            )}
          </Grid.Col>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
