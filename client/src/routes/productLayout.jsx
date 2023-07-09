import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import Footer from "../components/footer/footer";
import CheckoutCard from "../components/checkout/checkout";

function ProductLayout() {
  const products = [
    {
      id: 1,
      url: "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-watch-luxury-watch-transparent-png-image_6687168.png",
    },
    {
      id: 2,
      url: "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-watch-luxury-watch-transparent-png-image_6687168.png",
    },
    {
      id: 3,
      url: "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-watch-luxury-watch-transparent-png-image_6687168.png",
    },
    {
      id: 4,
      url: "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-watch-luxury-watch-transparent-png-image_6687168.png",
    },
  ];
  return (
    <div className="">
      <div className="my-5 md:mx-16 mx-4">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-4 ">
              {products.map((product) => {
                return (
                  <div className="bg-gray-50 w-52 ">
                    <img
                      alt="Men Watch"
                      className="transform hover:scale-110 min-h-[150px] bg-transparent"
                      src={product.url}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <nav>
              <a className="text-xs text-gray-800 mr-1">Home</a>
              <span className="text-xs text-gray-800 mr-1">/</span>
              <a className="text-xs text-gray-800 mr-1">Shop</a>
              <span className="text-xs text-gray-800 mr-1">/</span>
              <a className="text-xs text-gray-800 mr-1">Watches</a>
              <span className="text-xs text-gray-800 mr-1">/</span>
              <a className="text-xs text-gray-800 mr-1">Brown Q</a>
              <span className="text-xs text-gray-800 mr-1">/</span>
              <a className="text-xs text-gray-800 mr-1">Leather</a>
              <span className="text-xs text-gray-800 mr-1">/</span>
            </nav>

            <CheckoutCard />
          </div>
        </div>

        <nav className="border-b border-gray-300 my-5 py-2.5">
          <Link
            to="/product/:id/description"
            className="text-lg text-gray-800 font-semibold hover:text-green-500 hover:border-b-2 focus:border-b-2 border-green-500 py-3 mr-5"
          >
            Description
          </Link>{" "}
          <Link
            to="additional"
            className="text-lg text-gray-800 font-semibold hover:text-green-500 hover:border-b-2 focus:border-b-2 border-green-500 py-3 "
          >
            Additional Information
          </Link>
        </nav>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default ProductLayout;
