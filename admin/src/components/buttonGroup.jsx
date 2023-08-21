import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ButtonGroup({
    btn1txt = "All",
    btn2txt = "Add",
    link1 = "/",
    link2 = "/"
}) {

    const navigation = useNavigate();

    return (
        <div class="inline-flex rounded-md shadow-sm mx-6 " role="group">
            <button
                type="button"
                class="px-4 py-2 text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-l-md hover:bg-gray-100 hover:text-gray-600 focus:z-10 focus:ring-1 focus:ring-gray-700 focus:text-gray-700"
                onClick={() => navigation(link1)}
            >
                {btn1txt}
            </button>
            <button
                type="button"
                class="px-4 py-2 text-xs font-semibold text-gray-900 bg-white border-t border-b border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-gray-600 focus:z-10 focus:ring-1 focus:ring-gray-700 focus:text-gray-700"
                onClick={() => navigation(link2)}
            >
                {btn2txt}
            </button>
        </div>
    )
}
