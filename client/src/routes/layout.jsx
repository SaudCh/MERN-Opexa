import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { CiMail } from "react-icons/ci";
import { AiOutlinePhone, AiOutlineRight } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import Footer from "../components/footer/footer";

function Layout() {
  const [open, setopen] = useState(false);
  const [user, setUser] = useState(false);

  const toggle = () => {
    setopen(!open);
  };

  const toggleUser = () => {
    setUser(!user);
  };

  return (
    <div className="">
      <nav className="border-b border-gray-200" style={{ width: "100vw" }}>
        <div className="flex flex-row justify-between mx-5 py-0.5 px-2">
          <div className="hidden md:flex flex-row">
            <span className="border-x p-2 border-gray-200 text-xs font-thin text-gray-500 flex flex-row items-center">
              <CiMail className="mr-1" />
              spot@opxa.com
            </span>
            <span className="border-r p-2 border-gray-200 text-xs font-thin text-gray-500 flex flex-row items-center">
              <AiOutlinePhone className="mr-1" /> 090078601
            </span>
          </div>
          <div className="flex flex-row">
            <span className="border-x p-2 border-gray-200 text-xs font-thin text-gray-500">
              Welcome to Store
            </span>
            <div className="border-r border-gray-200">
              <select
                className=" border-none  outline-none text-gray-600 font-thin  text-xs  "
                name
                id
              >
                <option>English</option>
                <option>Urdu</option>
                <option>French</option>
              </select>
            </div>

            <div className="border-r border-gray-200">
              <select
                className=" border-none outline-none text-gray-600 font-thin  text-xs  "
                name
                id
              >
                <option>Dollar</option>
                <option>Pounds</option>
                <option>Pkr</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
      <header className="bg-white">
        <div className=" px-4 py-4 flex justify-between items-center">
          {/* logo */}
          <div className="">
            <Link
              to="/"
              className="self-center text-3xl font-bold whitespace-nowrap"
            >
              Opxa{" "}
            </Link>
          </div>

          {/* search */}
          <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl rounded-md hidden xl:flex items-center">
            <input
              className="border-l border-gray-200 text-gray-600 w-[400px] bg-transparent  text-sm pl-4"
              type="text"
              placeholder="I'm searching for ..."
            />
            <select
              className="bg-transparent  border-gray-200 text-gray-600 font-thin  text-sm p-2 "
              name
              id
            >
              <option>All Categories</option>
              <option>All Categories</option>
              <option>All Categories</option>
              <option>All Categories</option>
              <option>All Categories</option>
              <option>All Categories</option>
            </select>
            <svg
              className=" h-[38px]  px-4 text-white bg-green-600 py-2"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
              />
            </svg>
          </div>

          <nav className="contents">
            <ul className="ml-4 xl:w-48 flex items-center justify-end">
              <li className="ml-2 lg:ml-4 relative inline-block">
                <a className href>
                  <svg
                    className="h-9 lg:h-10 p-2 text-black"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="user"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
                    />
                  </svg>
                </a>
              </li>
              <li className="ml-2 lg:ml-4 relative inline-block">
                <Link to="/wishlist" className href>
                  <div className="absolute -top-1 right-0 z-10 text-white bg-green-500 text-xs  px-1.5 py-0.5 rounded-sm">
                    3
                  </div>
                  <svg
                    className="h-9 lg:h-10 p-2 text-black"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="heart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <hr />
      </header>

      {/* component */}
      {/* This is an example component */}
      <div className="px-10 bg-green-400 text-white">
        <nav className="border-gray-200">
          <div className=" flex flex-wrap  items-center ">
            <div className="relative mr-8 z-50">
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="text-#f8f9fa hover:bg-green-700 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
                onClick={toggleUser}
              >
                Opex
                <FaBars className="ml-3" />
              </button>
              {/* Dropdown menu */}
              {user && (
                <div
                  id="dropdownNavbar"
                  className="absolute    bg-white text-base z-20 list-none divide-y divide-gray-100  shadow w-44 md:w-60 "
                >
                  <ul className="py-1" aria-labelledby="dropdownLargeButton">
                    <li>
                      <a
                        href="#"
                        className="text-sm border-b hover:bg-gray-100 flex flex-row justify-between text-gray-600  px-4 py-2"
                      >
                        Men's Clothing
                        <AiOutlineRight />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm border-b hover:bg-gray-100 flex flex-row justify-between text-gray-600  px-4 py-2"
                      >
                        Women's Clothing
                        <AiOutlineRight />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm border-b hover:bg-gray-100 flex flex-row justify-between text-gray-600  px-4 py-2"
                      >
                        Bag Packs
                        <AiOutlineRight />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm border-b hover:bg-gray-100 flex flex-row justify-between text-gray-600  px-4 py-2"
                      >
                        Shoes
                        <AiOutlineRight />
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-sm border-b hover:bg-gray-100 flex flex-row justify-between text-gray-600  px-4 py-2"
                      >
                        Jwellary
                        <AiOutlineRight />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm border-b hover:bg-gray-100 flex flex-row justify-between text-gray-600  px-4 py-2"
                      >
                        Men's Clothing
                        <AiOutlineRight />
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className="md:hidden ml-3 text-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="hidden md:block w-full md:w-auto" id="mobile-menu ">
              <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <a
                    href="#"
                    className="text-#f8f9fa hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li className="relative">
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    className="text-#f8f9fa hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
                    onClick={toggle}
                  >
                    Dropdown{" "}
                    <svg
                      className={`w-4 h-4 ml-1 ${
                        open ? "transform rotate-180" : ""
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {/* Dropdown menu */}
                  {open && (
                    <div
                      id="dropdownNavbar"
                      className="absolute right-0 mt-2 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44"
                    >
                      <ul
                        className="py-1"
                        aria-labelledby="dropdownLargeButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2"
                          >
                            Earnings
                          </a>
                        </li>
                      </ul>
                      <div className="py-1">
                        <a
                          href="#"
                          className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2"
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                  )}
                </li>

                <li>
                  <a
                    href="#"
                    className="text-#f8f9fa hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <Link
                    to="/properties"
                    className="text-#f8f9fa hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-#f8f9fa hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
