import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const columns = [
  { headerName: "Name" },

  {
    headerName: "Icon",
  },

  {
    headerName: "Action",
  },
];

export default function CryptoTable({ data, deleteCategory }) {
  return (
    <div>
      <div className="block py-2   mx-1 md:mx-2 ">
        <div className="flex justify-center">
          <table className="rounded-md">
            <thead>
              {columns.map((column) => (
                <th>{column.headerName}</th>
              ))}
            </thead>
            <tbody>


              {
                data.map((item) => {
                  return (<tr>
                    <td data-label="name">{item.name}</td>

                    <td data-label="image">
                      <div className="flex items-center justify-end md:justify-center">
                        <img
                          src={item.image}
                          alt="category"
                          className="w-[80px] h-[80px] object-contain border rounded-full"
                        />
                      </div>
                    </td>
                    <td data-label="action">
                      <div className="flex flex-row justify-end md:justify-center">
                        <Link
                          to={"/crypto/" + item.id}
                          className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                        >
                          Edit
                        </Link>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                          onClick={() => deleteCategory(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>)
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
