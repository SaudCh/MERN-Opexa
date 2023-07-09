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

export default function AppRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
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
