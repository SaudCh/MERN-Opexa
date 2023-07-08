import { BsDot } from "react-icons/bs";

import React, { useState } from "react";

function CheckoutCard() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <h1 className="my-5 text-2xl text-gray-900 font-semibold">
        Brown Q Leather Men Watch
      </h1>

      <h1 className="my-5 text-2xl text-gray-900 mr-5 font-semibold">
        $1699.00
      </h1>

      <span className="font-light text-green-600 text-sm">In Stocks</span>
      <div className="flex flex-row my-5">
        <span className="mr-5 font-semibold">Highlights :</span>

        <div>
          <span className="text-sm text-gray-600 flex flex-row items-center mb-2 ">
            <BsDot className="mr-1.5 text-2xl" />
            Adjustable Bracelet
          </span>

          <span className="text-sm text-gray-600 flex flex-row items-center mb-2 ">
            <BsDot className="mr-1.5 text-2xl" />
            Mineral crystal face
          </span>

          <span className="text-sm text-gray-600 flex flex-row items-center mb-2 ">
            <BsDot className="mr-1.5 text-2xl" />
            Quartz movement.
          </span>

          <span className="text-sm text-gray-600 flex flex-row items-center mb-2 ">
            <BsDot className="mr-1.5 text-2xl" />
            Buckle closure.
          </span>

          <span className="text-sm text-gray-600 flex flex-row items-center mb-2 ">
            <BsDot className="mr-1.5 text-2xl" />
            Stainless steel/leather.
          </span>

          <span className="text-sm text-gray-600 flex flex-row items-center mb-2 ">
            <BsDot className="mr-1.5 text-2xl" />
            Day and date function
          </span>
        </div>
      </div>

      <div className="flex flex-row my-5 items-center">
        <span className="mr-16 font-semibold">Color :</span>

        <div className="flex flex-row ">
          <div className=" bg-black w-6 h-6 rounded-full mr-2 transform hover:scale-105 ">
            {" "}
          </div>

          <div className=" bg-blue-600  w-6 h-6 rounded-full  mr-2 transform hover:scale-105 "></div>
        </div>
        <button className="text-sm ml-3 font-thin text-gray-600">Clear</button>
      </div>

      <div className="mt-12 flex flex-row items-center">
        <div>
          <span
            className="border border-gray-300 text-gray-800 px-2 py-2 cursor-pointer"
            onClick={decrement}
          >
            -
          </span>
          <span className="border-y  border-gray-300 text-gray-800 px-4 py-2">
            {count}
          </span>
          <span
            className="border border-gray-300 text-gray-800 px-2 py-2 cursor-pointer"
            onClick={increment}
          >
            +
          </span>
        </div>

        <button className="bg-green-600 text-white py-2 w-32 ml-4 font-semibold">
          Add to Cart
        </button>
        <button className="bg-[#735936] text-white py-2 w-32 ml-4 font-semibold">
          By Now
        </button>
      </div>
    </div>
  );
}

export default CheckoutCard;
