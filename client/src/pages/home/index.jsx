import React from "react";
import ProductCard from "../../components/home/productCard";
import SmallCards from "../../components/home/smallCards";
import RoundedCard from "../../components/home/roundedCard";
import Card from "../../components/home/card";
import Footer from "../../components/footer/footer";
import "./index.css";
function Home() {
  return (
    <div className="">
      <div className="home-back">
        <div
          className=" grid grid-cols-1 md:grid-cols-2 text-center flex-wrap ml-2 md:ml-32 items-center  justify-center "
          style={{ minHeight: "70vh" }}
        >
          <div className="mt-12">
            <h1 className=" text-xl md:text-3xl  font-medium text-green-600 mb-2 text-center">
              New Season
            </h1>

            <h1 className="font-bold uppercase my-6 text-6xl  ">Men's Style</h1>

            <h1 className=" tracking-wide sale text-gray-800 text-xl md:text-4xl mb-6">
              Min. 30-70% Off
            </h1>

            <div className="flex flex-row justify-center mt-5  text-center  ">
              <button className="uppercase bg-green-600 text-white mr-8 font-semibold   px-4 py-2 md:px-6 md:text-sm">
                Shop now!
              </button>

              <button className="uppercase bg-white border-2 border-green-600 text-green-600 mr-8 font-semibold   px-4 py-2 md:px-6 md:text-sm">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 p-5 items-center grid grid-cols-2 md:grid-cols-6 xl:grid-cols-8  gap-4">
        <RoundedCard />
        <RoundedCard />
        <RoundedCard />
        <RoundedCard />
        <RoundedCard />
        <RoundedCard />
        <RoundedCard />
        <RoundedCard />
      </div>

      <div>
        <h1 className=" text-gray-900 font-semibold text-center uppercase">
          Deals of the day
        </h1>

        <div className="p-10 grid grid-cols-1  md:grid-cols-5 ml-16  gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 flex-row justify-center items-center gap-4">
        <Card />
        <Card />
        <Card />
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-between p-5 mt-8 mb-[-10px] mx-5 border-b">
          <button className="font-semibold text-lg">Fashion Products</button>

          <div className="mr-12 flex flex-col md:flex-row items-center">
            <button className="font-semibold">New Arrival</button>
            <button className="mx-4 font-semibold">Best Selling</button>
            <button className="font-semibold">Top Rated</button>
          </div>
        </div>

        <div className="p-10 grid grid-cols-1  md:grid-cols-5 ml-16  gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      <div>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          <div className="rounded overflow-hidden  ">
            <h1 className=" text-gray-900 font-semibold uppercase">
              Featured Products
            </h1>
            <SmallCards />
            <SmallCards />
            <SmallCards />
            <SmallCards />
          </div>

          <div className="rounded overflow-hidden  ">
            <h1 className=" text-gray-900 font-semibold uppercase">
              Top rated Products
            </h1>

            <SmallCards />
            <SmallCards />
            <SmallCards />
            <SmallCards />
          </div>

          <div className="rounded overflow-hidden  ">
            <h1 className=" text-gray-900 font-semibold uppercase">
              Best Selling Products
            </h1>

            <SmallCards />
            <SmallCards />
            <SmallCards />
            <SmallCards />
          </div>

          <div className="rounded overflow-hidden  ">
            <h1 className=" text-gray-900 font-semibold uppercase">
              Latest Products
            </h1>
            <SmallCards />
            <SmallCards />
            <SmallCards />
            <SmallCards />
          </div>
        </div>
      </div>
      <div className="bg-green-500 mb-5 w-full gap-6 p-5 py-10  text-white grid grid-cols-1 md:grid-cols-2 justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold">
            Subscribe to Our News Letter
          </h1>
          <span className="text-sm ">
            Subscribe today and get special offers, coupons and news.
          </span>
        </div>
        <div>
          {/* component */}
          {/* Creacte By Joker Banny */}

          <form className="flex flex-row items-center">
            <div className="  rounded-lg overflow-hidden  px-4 py-2 ">
              <input
                className="text-base text-gray-400   outline-none px-2 rounded-lg "
                type="text"
                placeholder="Your Email Address "
              />
            </div>
            <div className=" px-2 rounded-lg  ">
              <button className="bg-indigo-500 text-white text-sm rounded-lg px-4 py-2 font-thin">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;