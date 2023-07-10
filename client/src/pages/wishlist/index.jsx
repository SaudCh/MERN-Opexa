import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
function Wishlist() {
  const array = [
    {
      product: "Brown Solid Laptop Bag",
      price: "$ 99.00",
      stock: "In Stock",
    },
    {
      product: "Laptop Bag",
      price: "$ 199.00",
      stock: "In Stock",
    },
    {
      product: "Brown Solid Laptop Bag",
      price: "$ 199.00",
      stock: "In Stock",
    },
    {
      product: "Brown Solid Laptop Bag",
      price: "$ 89.00",
      stock: " Stock Ended",
    },
  ];

  return (
    <div className="">
      <div className="bg-gray-100 w-full h-40 flex justify-center items-center flex-col">
        <h1 className="text-6xl font-semibold text-gray-900">Wishlist</h1>
        <nav className="text-sm font-thin text-gray-600">
          <a>Home</a>
          <span> / </span>
          <a>Wishlist</a>
        </nav>
      </div>
      <div className="my-5">
        <div className="hidden md:flex  flex-row justify-around border-y border-gray-300 md:mx-16 py-2 px-4 ">
          <span className="text-gray-900 font-semibold text-sm">
            Product Name
          </span>
          <span className="text-gray-900  font-semibold text-sm">
            Unit Price
          </span>

          <span className="text-gray-900 font-semibold text-sm">
            Stock Status
          </span>
          <span></span>
        </div>
        {array.length === 0 ? (
          <h1 className="text-sm font-thin text-gray-600 text-center my-5">
            No products added to the wishlist
          </h1>
        ) : (
          array.map((wish) => {
            return (
              <div className="border-b text-center border-gray-300 py-3  px-4 grid grid-rows-1  md:grid-cols-4 gap-4 items-center justify-around md:mx-16">
                <div className="flex flex-row items-center ">
                  <RxCross2 className="mr-5 font-bold text-gray-900" />
                  <img
                    className="w-24 h-24  md:w-12 md:h-16 mr-5"
                    src="https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Unisex-Brown-Solid-Laptop-Bag-430x502.jpg"
                  />
                  <h1 className=" text-xs md:text-sm  text-gray-900 font-semibold">
                    {wish.product}
                  </h1>
                </div>
                <div className="md:ml-36 flex flex-row justify-between md:flex-none">
                  <h1 className="md:hidden text-sm text-gray-900">Price</h1>
                  <h1 className="text-green-600 font-semibold ">
                    {wish.price}
                  </h1>
                </div>
                <div className="md:ml-36 flex flex-row justify-between md:flex-none">
                  <h1 className="md:hidden text-sm text-gray-900">Stocks</h1>
                  <h1 className="text-sm font-thin text-green-600 ">
                    {wish.stock}
                  </h1>
                </div>
                <div>
                  <button className="bg-green-500 text-white font-semibold w-32 py-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Wishlist;
