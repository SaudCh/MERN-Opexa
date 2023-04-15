import React from "react";
import { MdArrowCircleUp } from "react-icons/md";
import OrderTable from "../../components/tables/orders";

export default function Orders() {
  return (
    <div className="m-2 px-4">
      <div className="my-4 flex flex-row">
        <h1 className=" text-2xl font-semibold mr-2">Orders</h1>

        <div class="inline-flex rounded-md shadow-sm mx-6 " role="group">
          <button
            type="button"
            class="px-4 py-2 text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-l-md hover:bg-gray-100 hover:text-gray-600 focus:z-10 focus:ring-1 focus:ring-gray-700 focus:text-gray-700"
          >
            Daily
          </button>
          <button
            type="button"
            class="px-4 py-2 text-xs font-semibold text-gray-900 bg-white border-t border-b border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-gray-600 focus:z-10 focus:ring-1 focus:ring-gray-700 focus:text-gray-700"
          >
            Monthly
          </button>
        </div>
      </div>

      <div class="flex flex-row justify-between flex-wrap  ">
        <div className="bg-blue-50 p-4 pb-7 pr-12 m-3 rounded-md ">
          <h1 className="text-sm font-semibold my-3">New Orders</h1>
          <div className="flex flex-row">
            <span className="text-2xl font-semibold text-blue-700">245</span>
            <span class="mx-4 text-2xl font-thin">|</span>
            <span className="text-sm font-medium mt-1 mr-4">
              Impression - 20%
            </span>
            <span className=" text-xl text-blue-600 mt-1">
              <MdArrowCircleUp />
            </span>
          </div>
        </div>

        <div className="bg-purple-50 p-4 pb-7 m-3 pr-12 rounded-md ">
          <h1 className="text-sm font-semibold my-3">New Orders</h1>
          <div className="flex flex-row">
            <span className="text-2xl font-semibold text-purple-700">245</span>
            <span class="mx-4 text-2xl font-thin">|</span>
            <span className="text-sm font-medium mt-1 mr-4">
              Impression - 20%
            </span>
            <span className=" text-xl text-purple-600 mt-1">
              <MdArrowCircleUp />
            </span>
          </div>
        </div>

        <div className="bg-red-50 p-4 pb-7 pr-12 m-3 rounded-md ">
          <h1 className="text-sm font-semibold my-3">Delivered Orders</h1>
          <div className="flex flex-row">
            <span className="text-2xl font-semibold text-red-700">245</span>
            <span class="mx-4 text-2xl font-thin">|</span>
            <span className="text-sm font-medium mt-1 mr-4">
              Impression - 18%
            </span>
            <span className=" text-xl text-red-600 mt-1">
              <MdArrowCircleUp />
            </span>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-row justify-between flex-wrap my-2">
        <button className="text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-gray-600 focus:z-10  focus:ring-gray-700 focus:text-gray-700 focus:underline-offset-4">
          All Orders
        </button>
        <button className="text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-gray-600 focus:z-10  focus:ring-gray-700 focus:text-gray-700 focus:underline-offset-4">
          Pending Orders
        </button>
        <button className="text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-gray-600 focus:z-10  focus:ring-gray-700 focus:text-gray-700 focus:underline-offset-4">
          Delivered Orders
        </button>
        <button className="text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-gray-600 focus:z-10  focus:ring-gray-700 focus:text-gray-700 focus:underline-offset-4">
          {" "}
          Booked Orders
        </button>
        <button className="text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-gray-600 focus:z-10  focus:ring-gray-700 focus:text-gray-700 focus:underline-offset-4">
          Cancelled Orders
        </button>
      </div> */}

      <OrderTable />
    </div>
  );
}
