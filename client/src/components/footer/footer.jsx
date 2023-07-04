import { Link } from "react-router-dom";
import { FiTwitter } from "react-icons/fi";
import { FaFacebookF, FaCcStripe, FaCcPaypal, FaCcVisa } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

import React from "react";

function Footer() {
  return (
    <div className="">
      <footer className="pl-5  sm:p-6 bg-white">
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-1 md:grid-cols-4 w-full">
            <div className="mb-6 sm:mb-1">
              <h2 className="mb-1 sm:mb-3 text-sm font-semibold text-gray-700 uppercase ">
                Contact info
              </h2>
              <div className="mb-3   ">
                <h1 className="uppercase font-thin text-gray-700 text-sm">
                  Address:
                </h1>
                <span className="text-gray-500 text-xs">
                  st 26 name city , us
                </span>
              </div>

              <div className="mb-3  ">
                <h1 className="uppercase font-thin  text-gray-700 text-sm">
                  Phone:
                </h1>
                <span className="text-gray-500 text-xs">123456787654</span>
              </div>

              <div className="mb-3  font-thin ">
                <h1 className="uppercase text-gray-700 text-sm">Email:</h1>
                <span className="text-gray-500 text-xs">
                  shamirajpoot761@gmail.com
                </span>
              </div>

              <div className="mb-3  font-thin ">
                <h1 className="uppercase text-gray-700 text-sm">
                  Working hours:
                </h1>
                <span className="text-gray-500 text-xs">
                  Mon-Sun / 9:00 am to 9:00 pm
                </span>
              </div>
              <div className="flex">
                <FaFacebookF
                  className="h-10 w-10 mr-3 rounded-full text-gray-700 border shadow p-2"
                  alt="Facebook Logo"
                />

                <FiTwitter
                  className="h-10 w-10 mr-3 rounded-full text-gray-700 border shadow p-2"
                  alt="Whatsapp Logo"
                />

                <BsWhatsapp
                  className="h-10 w-10 mr-3 rounded-full text-gray-700 border shadow p-2"
                  alt="Twitter Logo"
                />
              </div>
            </div>

            <div className="mb-3 sm:mb-1">
              <h2 className="mb-1 sm:mb-3 text-sm font-semibold uppercase text-gray-700">
                Customert Service{" "}
              </h2>
              <ul className="text-gray-700 text-xs mb-1 ">
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Help & FAQs
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Order Tracking
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Shipping & Delivery
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Order History
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Advance Search
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    My Account
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Carrier
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    About Us
                  </Link>
                </li>

                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-3 sm:mb-1">
              <h2 className="mb-1 sm:mb-3 text-sm font-semibold uppercase text-gray-700">
                my account{" "}
              </h2>
              <ul className="text-gray-700 text-xs mb-1 ">
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Help & FAQs
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Order Tracking
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Shipping & Delivery
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Order History
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Advance Search
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    My Account
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Carrier
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    About Us
                  </Link>
                </li>

                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-3 sm:mb-1">
              <h2 className="mb-1 sm:mb-3 text-sm font-semibold uppercase text-gray-700">
                Infromation{" "}
              </h2>
              <ul className="text-gray-700 text-xs mb-1 ">
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Help & FAQs
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Order Tracking
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Shipping & Delivery
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Order History
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Advance Search
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    My Account
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Carrier
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    About Us
                  </Link>
                </li>

                <li className="mb-2">
                  <Link to="/about" className="hover:underline ">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between text-center">
          <span className="text-sm text-gray-500 text-center dark:text-gray-400">
            © Copyright{" "}
            <a href="https://VTChashma.pk/" className="hover:underline">
              msoptics.be
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex flex-row mr-2">
            <FaCcVisa
              className="h-10 w-10 mr-3  text-gray-700 "
              alt="Facebook Logo"
            />

            <FaCcPaypal
              className="h-10 w-10 mr-3  text-gray-700 "
              alt="Facebook Logo"
            />

            <FaCcStripe
              className="h-10 w-10 mr-3  text-gray-700 "
              alt="Facebook Logo"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
