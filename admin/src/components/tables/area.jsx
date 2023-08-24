import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const columns = [
    { headerName: "Name" },

    {
        headerName: "State",
    },
    {
        headerName: "City",
    },

    {
        headerName: "Action",
    },
];

export default function AreaTable({ data, deleteCategory }) {
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
                                        <td data-label="name">{item?.state}</td>
                                        <td data-label="name">{item?.city}</td>
                                        <td data-label="action">
                                            <div className="flex flex-row justify-end md:justify-center">
                                                <Link
                                                    to={"/area/" + item._id}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                                                    onClick={() => deleteCategory(item.id, item?.subcategory?._id)}
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
        </div >
    );
}
