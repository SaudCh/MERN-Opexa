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

export default function AppRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    )
  );

  return <RouterProvider router={router} />;
}
