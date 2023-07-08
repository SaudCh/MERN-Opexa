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

export default function AppRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Checkout />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
