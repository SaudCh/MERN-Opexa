import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
// import AuthRoutes from "./AuthRoutes";

const Home = lazy(() => import("../screens/home"));

const Router = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed top-0 left-0 flex h-screen w-full items-center justify-center"></div>
      }
    >
      <Routes>
        {/* <Route
          path="auth/*"
          element={<AuthRoute component={<AuthRoutes />} />}
        /> */}
        <Route path="/" element={<Home />} />
        {/* <Route path="collections/:id" element={<Collection />} />
        <Route path="search" element={<Search />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="products/c/:id" element={<Customize />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route
          path="account"
          element={<ProtectedRoute component={<Account />} />}
        />

        <Route
          path="wishlist"
          element={<ProtectedRoute component={<Wishlist />} />}
        />

        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  );
};

export default Router;
