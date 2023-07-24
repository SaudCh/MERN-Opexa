import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import React from "react";

import Home from "../pages/home";
import Layout from "./layout";
import Checkout from "../pages/checkout";
import Description from "../components/checkout/description";
import ProductLayout from "./productLayout";
import Additional from "../components/checkout/additional";
import Wishlist from "../pages/wishlist";
import Properties from "../pages/properties";
import Popular from "../components/properties/popular";
import Cities from "../components/properties/cities";
import Categories from "../components/properties/categories";
import AreaUnit from "../components/properties/areaUnit";
import PriceRange from "../components/properties/priceRange";
import Profile from "../pages/profile";

export default function AppRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/properties" element={<Properties />}>
            <Route path="/properties/popular" element={<Popular />} />
            <Route path="/properties/cities" element={<Cities />} />
            <Route path="/properties/categories" element={<Categories />} />
            <Route path="/properties/area" element={<AreaUnit />} />
            <Route path="/properties/price" element={<PriceRange />} />
          </Route>

          <Route path="/product/:id" element={<Checkout />}>
            <Route path="/product/:id/description" element={<Description />} />
            <Route path="/product/:id/additional" element={<Additional />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
