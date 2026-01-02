import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { AuthGuard } from "@/app/guards";

// Pages
import { HomePage } from "@/pages/home";
import { CatalogPage } from "@/pages/catalog";
import { ProductPage } from "@/pages/product";
import { CartPage } from "@/pages/cart";
import { CheckoutPage, PaymentResultPage } from "@/pages/checkout";
import { FavoritesPage } from "@/pages/favorites";
import { ProfilePage } from "@/pages/profile";
import { OrdersPage } from "@/pages/orders";
import { AddressesPage, AddAddressPage } from "@/pages/addresses";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      {
        path: "catalog",
        element: <CatalogPage />,
      },
      {
        path: "basket",
        element: (
          <AuthGuard>
            <CartPage />
          </AuthGuard>
        ),
      },
      {
        path: "favorites",
        element: (
          <AuthGuard>
            <FavoritesPage />
          </AuthGuard>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        ),
      },
      {
        path: "orders",
        element: (
          <AuthGuard>
            <OrdersPage />
          </AuthGuard>
        ),
      },
      {
        path: "addresses",
        element: (
          <AuthGuard>
            <AddressesPage />
          </AuthGuard>
        ),
      },
      {
        path: "addresses/add",
        element: (
          <AuthGuard>
            <AddAddressPage />
          </AuthGuard>
        ),
      },
      {
        path: "checkout",
        element: (
          <AuthGuard>
            <CheckoutPage />
          </AuthGuard>
        ),
      },
      {
        path: "payment-result",
        element: <PaymentResultPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
