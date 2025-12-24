import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { HomePage } from "@/pages/Desktop/Home";
import { ProductDetailPage } from "@/pages/Desktop/ProductDetail";
import { ProfilePage } from "@/pages/Desktop/Profile";
import { OrdersPage } from "@/pages/Desktop/Orders";
import { FavoritesPage } from "@/pages/Desktop/Favorites";
import { CatalogPage } from "@/pages/Desktop/Catalog";
import { CheckoutPage } from "@/pages/Desktop/Checkout";
import { useDevice } from "@/hooks/useDevice";

// Placeholder component for now
const PlaceholderPage = () => null;

const { isMobile } = useDevice();

const desktopRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "product/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "catalog",
    element: <CatalogPage />,
  },
  {
    path: "catalog/:categoryId",
    element: <CatalogPage />,
  },
  {
    path: "promo",
    element: <PlaceholderPage />,
  },
  {
    path: "checkout",
    element: <CheckoutPage />,
  },
  {
    path: "favorites",
    element: <FavoritesPage />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
  {
    path: "orders",
    element: <OrdersPage />,
  },
];

const mobileRoutes = [
  {
    path: "/",
    element: <div>Mobile</div>,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: isMobile ? mobileRoutes : desktopRoutes,
  },
]);
