import { Outlet, useLocation } from "react-router-dom";
import classes from "./DesktopLayout.module.css";
import { Header } from "./Header/Header";
import { Catalog } from "./Catalog/Catalog";
import { Basket } from "@/features/cart";
import { Footer } from "@/components/ui";
import { Grid } from "@mantine/core";

export function DesktopLayout() {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <div className={classes.layout}>
      <Header />
      <Grid
        className={`${classes.layoutContent} container`}
        mb={{ base: 20, md: 30, lg: 40 }}
        gutter="lg"
      >
        <Grid.Col span={8 / 3}>
          {!isCheckoutPage && (
            <div className={classes.navbar}>
              <Catalog />
            </div>
          )}
        </Grid.Col>

        <Grid.Col span={isCheckoutPage ? 28 / 3 : 20 / 3}>
          <div className={classes.main}>
            <Outlet />
          </div>
        </Grid.Col>

        {!isCheckoutPage && (
          <Grid.Col span={8 / 3}>
            <div className={classes.aside}>
              <Basket />
            </div>
          </Grid.Col>
        )}
      </Grid>

      <Footer />
    </div>
  );
}
