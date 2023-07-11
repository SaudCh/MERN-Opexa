import React from "react";
import { Link, Outlet } from "react-router-dom";

function FilterLayout() {
  return (
    <div>
      <div className=" shadow bg-white p-5 min-h-[55vh]">
        <h1 className="text-xl text-gray-700 font-medium">Browse Properties</h1>

        <nav className="my-5 text-xs md:text-sm">
          <Link
            to="/properties/popular"
            className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-200 focus:bg-gray-800 focus:text-white"
          >
            Popular
          </Link>

          <Link
            to="/properties/area"
            className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 ml-1 md:ml-5 hover:bg-gray-200 focus:bg-gray-800 focus:text-white"
          >
            Area Unit
          </Link>

          <Link
            to="/properties/categories"
            className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 ml-1 md:ml-5 hover:bg-gray-200 focus:bg-gray-800 focus:text-white"
          >
            Categories
          </Link>

          <Link
            to="/properties/cities"
            className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 ml-1 md:ml-5 hover:bg-gray-200 focus:bg-gray-800 focus:text-white"
          >
            Cities
          </Link>

          <Link
            to="/properties/price"
            className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 ml-1 md:ml-5 hover:bg-gray-200 focus:bg-gray-800 focus:text-white"
          >
            Price Range
          </Link>
        </nav>

        <Outlet />
      </div>
    </div>
  );
}

export default FilterLayout;
