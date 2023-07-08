import React from "react";

import "./index.css";
function Crousal() {
  return (
    <div>
      {" "}
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        <div className="relative  overflow-hidden  " style={{ height: "50vh" }}>
          <div
            className="home-back hidden duration-700 ease-in-out"
            data-carousel-item
          >
            <div
              className=" grid grid-cols-1 md:grid-cols-2 text-center flex-wrap ml-2 md:ml-32 items-center  justify-center "
              style={{ minHeight: "50vh" }}
            >
              <div className="">
                <h1 className=" text-xl md:text-3xl  font-medium text-green-600 mb-2 text-center">
                  New Season
                </h1>

                <h1 className="font-bold uppercase my-6 md:text-4xl  text-xl">
                  Men's Style
                </h1>

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
          <div
            className="home-back2 hidden duration-700 ease-in-out"
            data-carousel-item
          >
            <div
              className=" grid grid-cols-1 md:grid-cols-2 text-center flex-wrap  float-right items-center  justify-end "
              style={{ minHeight: "50vh" }}
            >
              <div className="">
                <h1 className=" text-xl md:text-3xl  font-medium text-green-600 mb-2 text-center">
                  Summer Sale
                </h1>

                <h1 className="font-semibold uppercase my-6 md:text-4xl  text-xl">
                  Collections
                </h1>

                <h1 className=" tracking-wide sale text-gray-800 text-xl md:text-4xl mb-6">
                  UPTO 70% Off
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
        </div>

        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white ">
            <svg
              className="w-4 h-4 bg-white/20 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 1 1 5l4 4"
              />
            </svg>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-4 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 bg-white/20 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Crousal;
