import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import "./sidebar.css";
import { AuthContext } from "../contexts/authContext";
import LoadingSpinner from "../components/spinner";
import { LoadingContext } from "../contexts/loadingContext";
import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineDashboard, MdPayment, MdLogout } from "react-icons/md";
import { GrUnorderedList } from "react-icons/gr";
import { RiProductHuntLine } from "react-icons/ri";
import { BiUser, BiCategoryAlt } from "react-icons/bi";
import { FiChevronDown } from 'react-icons/fi'

function Layout() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(false);
  const { loading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { Logout } = useContext(AuthContext);

  const logout = () => {
    // Logout();
    navigate("/login");
  };

  return (
    <div>
      {loading && <LoadingSpinner asOverlay />}
      <div
        className={`bg-emerald-700 h-screen p-5 pt-8 w-72 fixed top-0 sidebar z-50 ${open ? "w-72" : "w-20"
          }`}
        style={{
          transition: "all 0.5s ease",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,

        }}
      >
        <BsArrowLeft
          className={`bg-white text-3xl rounded-full text-dark-purple absolute -right-3 top-9
       border-2 border-dark-purple cursor-pointer ${!open && "rotate-180"}`}
          onClick={() => {
            setOpen(!open);
            setType(false);
          }}
        />

        {/* Logo */}
        <div className="inline-flex">
          <div
            className={`bg-amber-300 text-4xl block float-left cursor-pointer rounded duration-500 text-white px-1 ${!open && "rotate-[360deg]"
              }`}
          >
            O
          </div>
          <h1
            className={`origin-left duration-300 text-white font-medium text-2xl ml-3 ${!open && "scale-0"
              }`}
          >
            {" "}
            OPXA
          </h1>
        </div>

        {/* Search */}
        <div
          className={` items-center hidden rounded-md bg-light-white mt-6 py-2  ${!open ? "px-2.5" : "px-4"
            }`}
        >
          <BiSearch
            className={`text-white block float-left cursor-pointer text-lg  ${open && "mr-2"
              }`}
          />
          <input
            type={"search"}
            placeholder="search"
            className={`text-base bg-transparent w-full focus:outline-none text-white ${!open && "hidden"
              }`}
          />
        </div>
        <ul className="pt-2">
          {/* Dashboard */}
          <Link
            to="/"
            className={` rounded-md text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer hover:bg-light-white py-4 p-2`}
          >
            <span className="text-2xl block float-left">
              <MdOutlineDashboard />
            </span>
            <span
              className={` text-base font-md flex-1 
            ${!open && "hidden"}`}
            >
              Dashboard
            </span>
          </Link>

          {/* Products */}
          <Link
            className={` rounded-md text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer hover:bg-light-white py-4 p-2`}
            to="/products"
          >
            <span className="text-2xl block float-left">
              <RiProductHuntLine />
            </span>
            <span
              className={` text-base font-md flex-1 
            ${!open && "hidden"}`}
            >
              Products
            </span>
          </Link>

          {/* Types Dropdown */}
          <div
            data-dropdown-toggle="dropdown"
            className="rounded-md text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer hover:bg-light-white py-4 p-2"
            type="button"
            onClick={() => {
              if (open) setType(!type);
            }}
          >
            <span className="text-2xl block float-left">
              <BiCategoryAlt />
            </span>
            <span
              className={` text-base font-md flex-1 
            ${!open && "hidden"}`}
            >
              Categories
            </span>
            <FiChevronDown
              className={`duration-100 ${!type && "rotate-180"}`}
            />
          </div>

          {/* Dropdown */}
          <div
            id="dropdown"
            className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ml-10 mt-2 duration-500 ${!type && "hidden"
              }`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link
                  to="/categories"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  to="/subcategories"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  SubCategory
                </Link>
              </li>
              <li>
                <Link
                  to="/furthercategories"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Futher Subcategory
                </Link>
              </li>
            </ul>
          </div>

          {/* Users */}
          <Link
            className={` rounded-md text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer hover:bg-light-white py-4 p-2`}
            to="/users"
          >
            <span className="text-2xl block float-left">
              <BiUser />
            </span>
            <span
              className={` text-base font-md flex-1 
            ${!open && "hidden"}`}
            >
              User
            </span>
          </Link>

          {/* Orders */}
          <Link
            className={` rounded-md text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer hover:bg-light-white py-4 p-2`}
            to="/orders"
          >
            <span className="text-2xl block float-left">
              <GrUnorderedList />
            </span>
            <span
              className={` text-base font-md flex-1 
            ${!open && "hidden"}`}
            >
              Orders
            </span>
          </Link>

          {/* Payments */}
          <Link
            className={` rounded-md text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer hover:bg-light-white py-4 p-2`}
            to="/payments"
          >
            <span className="text-2xl block float-left">
              <MdPayment />
            </span>
            <span
              className={` text-base font-md flex-1 
            ${!open && "hidden"}`}
            >
              Payments
            </span>
          </Link>

          {/* Logout */}
          <li
            className={` rounded-md text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer hover:bg-light-white py-4 p-2`}
          >
            <span className="text-2xl block float-left">
              <MdLogout />
            </span>
            <span
              className={` text-base font-md flex-1 
            ${!open && "hidden"}`}
            >
              Logout
            </span>
          </li>
        </ul>
      </div>
      <div className="ml-[65px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
