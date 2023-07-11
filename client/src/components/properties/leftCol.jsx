import React, { useState } from "react";
import { MdAddLocationAlt } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
function LeftCol() {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSize = () => {
    setSize(!size);
  };

  const cities = [
    {
      name: "Islamabad",
    },
    {
      name: "Karachi",
    },
    {
      name: "Multan",
    },
  ];

  const sizes = [
    {
      name: "Meter",
    },
    {
      name: "Square fit",
    },
    {
      name: "Inches",
    },
  ];
  return (
    <div>
      <div className="  md:col-span-1 shadow bg-white p-6">
        <h1 className="text-xl text-gray-700 font-medium mb-5">
          Search Properties
        </h1>

        <select
          id="countries"
          class=" border my-5  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected className="flex flex-row items-center">
            House
          </option>
          <option value="US">Appartment</option>
          <option value="CA">Land</option>
          <option value="FR">Roomate</option>
        </select>

        <div class="flex mb-5">
          <label for="states" class="sr-only">
            Choose a state
          </label>
          <select
            id="states"
            class=" border  text-gray-900 text-sm rounded-l-lg  dark:border-l-gray-600 border-l block w-full p-2.5 "
          >
            <option selected>Select Location</option>
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            <option value="WH">Washinghton</option>
            <option value="FL">Florida</option>
            <option value="VG">Virginia</option>
            <option value="GE">Georgia</option>
            <option value="MI">Michigan</option>
          </select>
          <div className="relative">
            <button
              id="states-button"
              data-dropdown-toggle="dropdown-states"
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500  border  rounded-r-lg  border-gray-600 "
              type="button"
              onClick={toggleDropdown}
            >
              <MdAddLocationAlt className="mr-5 font-semibold" />
              Lahore
            </button>
            {isOpen && (
              <div
                id="dropdown-states"
                className="absolute z-10 bg-white divide-y  rounded-lg shadow w-44 "
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="states-button"
                >
                  {cities.map((city) => {
                    return (
                      <li>
                        <button
                          type="button"
                          className="dropdown-item inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <div className="inline-flex items-center">
                            {city.name}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between my-5">
          <h1 className="text-sm text-gray-700 font-thin">Area Size</h1>
          <div className="relative">
            <button
              id="states-button"
              data-dropdown-toggle="dropdown-states"
              className="flex-shrink-0 z-10 inline-flex flex-row items-center  text-sm  text-center text-gray-700 "
              type="button"
              onClick={toggleSize}
            >
              Marla
              <RiArrowDropDownLine className="ml-2 text-lg" />
            </button>
            {size && (
              <div
                id="dropdown-states"
                className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="states-button"
                >
                  {sizes.map((size) => {
                    return (
                      <li>
                        <button
                          type="button"
                          className="dropdown-item inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <div className="inline-flex items-center">
                            {size.name}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row my-5">
          <input
            type="text"
            className="w-1/2 py-2 rounded-lg text-sm "
            placeholder="Min"
          />
          <input
            type="text"
            className="w-1/2 py-2 ml-2 rounded-lg text-sm "
            placeholder="Max"
          />
        </div>
        <button className="bg-blue-500 text-white w-full py-2 text-lg uppercase my-5">
          Search
        </button>
      </div>
    </div>
  );
}

export default LeftCol;
