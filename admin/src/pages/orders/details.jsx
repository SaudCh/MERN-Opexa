import React from "react";
import ProductInfo from "../../components/order/productInfo";

export default function OrderDetails() {
  return (
    <div className=" flex p-6 bg-slate-50">
      <div className="border w-full mx-auto md:basis-5/6 border-gray-200 shadow p-8 bg-white">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col ">
            <span className="font-semibold">#SE28GFT134</span>
            <span className="my-3 bg-green-600 text-white uppercase text-sm font-semibold text-center py-2 rounded-md">
              Delivered
            </span>
          </div>
          <div className="flex flex-col mt-3">
            <span className="text-xs font-semibold text-gray-400">
              03 March,2023
            </span>
            <span className="my-3 text-xs font-semibold text-gray-500">
              Cash on Delivered
            </span>
          </div>
        </div>
        <hr className="my-3" />
        <span className="my-3 text-sm text-gray-500">
          Tip: Tap a product if you'd like to make any changes
        </span>
        <hr className="my-3" />
        <ProductInfo />
        <hr className="my-3" />
        <ProductInfo />
        <hr className="my-3" />
        <ProductInfo />
        <hr className="my-3" />
        <div className="flex flex-row justify-between">
          <div className="mr-3 ">
            <button className="uppercase bg-blue-600 text-white text-xs font-medium py-3 px-6 ml-3 my-2 rounded-sm">
              Delivered
            </button>
            <button className="uppercase bg-gray-100 text-xs font-semibold py-3 px-6 my-2 ml-3 rounded-sm">
              Cancel
            </button>
          
          </div>
          <div className="flex flex-row mt-2 justify-center">
            <div className="flex flex-col justify-between mr-16 ">
              <span className="uppercase text-xs font-medium text-gray-500">
                Taxes
              </span>
              <span className="uppercase text-xs font-medium text-gray-500">
                Shipping
              </span>
            </div>

            <div className="flex flex-col justify-between">
              <span className="uppercase text-xs font-medium text-gray-600">
                Rs 1000.00
              </span>
              <span className="uppercase text-xs font-medium text-gray-600">
                Free
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
