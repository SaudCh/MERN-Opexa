import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import Orders from "../pages/orders";
import OrderDetails from "../pages/orders/details";
import Payments from "../pages/payments";
import Products from "../pages/products";
import AddProduct from "../pages/products/add";
import EditProducts from "../pages/products/edit";
import Users from "../pages/users";
import AuthRoute from "./authRoute";

import Loading from "./loading";
import ProtectedRoute from "./protectedRoute";
import Categories from "../pages/category";
import AddCategory from "../pages/category/add";
import EditCategory from "../pages/category/edit";
import SubCategories from "../pages/subcategory";
import EditSubCategory from "../pages/subcategory/edit";
import AddSubCategory from "../pages/subcategory/add";
import FurtherCategories from "../pages/furthercategory";
import AddFurtherCategory from "../pages/furthercategory/add";
import EditFurtherCategory from "../pages/furthercategory/edit";
import CryptoTransaction from "../pages/payments/cryptoTransaction";
import OfflineTransaction from "../pages/payments/offlineTransaction";
import Crypto from "../pages/payments/crypto";
import AddCrypto from "../pages/payments/addCrypto";
import EditCrypto from "../pages/payments/editCrypto";
import ProductsRequest from "../pages/products/requests";

const Layout = lazy(() => import("./layout"));

const Login = lazy(() => import("../pages/auth/login"));
const ForgotPassword = lazy(() => import("../pages/auth/forgetPassword"));
const ResetPassword = lazy(() => import("../pages/auth/resetPassword"));

const Home = lazy(() => import("../pages/home"));

export default function AppRouter() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Routes>
          <Route path="/login" element={<AuthRoute component={<Login />} />} />

          <Route
            path="forget-password"
            element={<AuthRoute component={<ForgotPassword />} />}
          />
          <Route
            path="reset-password/:token"
            element={<AuthRoute component={<ResetPassword />} />}
          />

          <Route path="/" element={<Layout />}>
            {/* Home */}
            <Route path="/" element={<ProtectedRoute component={<Home />} />} />

            {/* Products */}
            <Route
              path="/products"
              element={<ProtectedRoute component={<Products />} />}
            />
            <Route
              path="/product/add"
              element={<ProtectedRoute component={<AddProduct />} />}
            />
            <Route
              path="/products/requests"
              element={<ProtectedRoute component={<ProductsRequest />} />}
            />
            <Route
              path="/product/:id"
              element={<ProtectedRoute component={<EditProducts />} />}
            />

            {/* Category */}
            <Route
              path="/categories"
              element={<ProtectedRoute component={<Categories />} />}
            />
            <Route
              path="/category/add"
              element={<ProtectedRoute component={<AddCategory />} />}
            />

            <Route
              path="/category/:id"
              element={<ProtectedRoute component={<EditCategory />} />}
            />

            {/* Category */}
            <Route
              path="/subcategories"
              element={<ProtectedRoute component={<SubCategories />} />}
            />
            <Route
              path="/subcategory/add"
              element={<ProtectedRoute component={<AddSubCategory />} />}
            />

            <Route
              path="/subcategory/:id"
              element={<ProtectedRoute component={<EditSubCategory />} />}
            />

            {/* Category */}
            <Route
              path="/furthercategories"
              element={<ProtectedRoute component={<FurtherCategories />} />}
            />
            <Route
              path="/furthercategory/add"
              element={<ProtectedRoute component={<AddFurtherCategory />} />}
            />

            <Route
              path="/furthercategory/:id"
              element={<ProtectedRoute component={<EditFurtherCategory />} />}
            />

            {/* Users */}
            <Route
              path="/users"
              element={<ProtectedRoute component={<Users />} />}
            />

            {/* Orders */}
            <Route
              path="/orders"
              element={<ProtectedRoute component={<Orders />} />}
            />
            <Route
              path="/order/:id"
              element={<ProtectedRoute component={<OrderDetails />} />}
            />

            {/* Payments */}
            <Route
              path="/payments"
              element={<ProtectedRoute component={<Payments />} />}
            />
            <Route
              path="/offline-transactions"
              element={<ProtectedRoute component={<OfflineTransaction />} />}
            />
            <Route
              path="/crypto-transactions"
              element={<ProtectedRoute component={<CryptoTransaction />} />}
            />
            <Route
              path="/crypto"
              element={<ProtectedRoute component={<Crypto />} />}
            />
            <Route
              path="/crypto-add"
              element={<ProtectedRoute component={<AddCrypto />} />}
            />
            <Route
              path="/crypto/:cid"
              element={<ProtectedRoute component={<EditCrypto />} />}
            />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}
