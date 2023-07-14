import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function DropDown({ children, options, open }) {

    const [dp, setDp] = useState(false);

    return (
        <>
            <div
                data-dropdown-toggle="dropdown"
                className="rounded-md text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer hover:bg-light-white py-4 p-2"
                type="button"
                onClick={() => {
                    if (open) setDp(!dp);
                }}
            >
                <span className="text-2xl block float-left">
                    {children}
                </span>
                <span
                    className={` text-base font-md flex-1 
            ${!open && "hidden"}`}
                >
                    Payments
                </span>
                <FiChevronDown
                    className={`duration-100 ${!dp && "rotate-180"}`}
                />
            </div>

            {/* Dropdown */}
            <div
                id="dropdown"
                className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ml-10 mt-2 duration-500 ${(!dp || !open) && "hidden"
                    }`}
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                >
                    {
                        options.map((option, index) => (
                            <li key={index}>
                                <Link
                                    to={option.path}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    {option.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
