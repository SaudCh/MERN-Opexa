import React, { useEffect, useState } from "react";
import ProductCard from "../../components/home/productCard";
import SmallCards from "../../components/home/smallCards";
import RoundedCard from "../../components/home/roundedCard";
import Card from "../../components/home/card";
import Footer from "../../components/footer/footer";

import "./index.css";
import Crousal from "../../components/home/crousal";
function Home() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      await axios
        .get("/products")
        .then((res) => {
          console.log(res?.data?.products);
          setproducts(res?.data?.products);
        })
        .catch((err) => console.log(err));
    };

    getProducts();
  }, []);
  return (
    <div className="">
      <Crousal />

      <div className="p-5">
        <RoundedCard />
      </div>

      <div>
        <h1 className=" text-gray-900 font-semibold text-center uppercase">
          Deals of the day
        </h1>

        <div className=" p-5   ">
          <ProductCard />
        </div>
      </div>

      <div>
        <Card />
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-between p-5 mt-8 mb-[-10px] mx-16 border-b">
          <button className="font-semibold text-lg">Fashion Products</button>

          <div className="mr-12 flex flex-col md:flex-row items-center text-center">
            <button className="font-semibold">New Arrival</button>
            <button className="mx-4 font-semibold">Best Selling</button>
            <button className="font-semibold">Top Rated</button>
          </div>
        </div>

        <div className="p-5">
          <ProductCard />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap:12 md:gap-24  ">
          <div className="rounded overflow-hidden  ">
            <h1 className=" text-gray-900 font-semibold uppercase text-center md:text-left">
              Featured Products
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-1">
              <SmallCards />
              <SmallCards />
              <SmallCards />
              <SmallCards />
            </div>
          </div>
          <div className="rounded overflow-hidden  ">
            <h1 className=" text-gray-900 font-semibold uppercase text-center md:text-left">
              Top rated Products
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-1">
              <SmallCards />
              <SmallCards />
              <SmallCards />
              <SmallCards />
            </div>
          </div>

          <div className="rounded overflow-hidden  ">
            <h1 className=" text-gray-900 font-semibold uppercase text-center md:text-left">
              Best Selling Products
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-1">
              <SmallCards />
              <SmallCards />
              <SmallCards />
              <SmallCards />
            </div>
          </div>
          <div className="rounded overflow-hidden  ">
            <h1 className=" text-gray-900 font-semibold uppercase text-center md:text-left">
              Latest Products
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-1">
              <SmallCards />
              <SmallCards />
              <SmallCards />
              <SmallCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
