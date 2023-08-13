import React, { useContext, useEffect } from "react";
import { LoadingContext } from "../../contexts/loadingContext";

const columns = [
  { headerName: "Name" },

  {
    headerName: "Email",
  },
  {
    headerName: "Role",
  },
  {
    headerName: "Action",
  },
];
export default function UserTable({
  data,
  editUser,
}) {

  return (
    <div>
      <div className="block py-2   mx-1 md:mx-2 rounded-md">
        <div className="flex justify-center">
          <table>
            <thead>
              {columns.map((column) => (
                <th>{column.headerName}</th>
              ))}
            </thead>
            <tbody>
              {
                data.map((user) => (
                  <tr>
                    <td data-label="id">{user.name || 'N/A'}</td>
                    <td data-label="date">{user.email}</td>
                    <td data-label="name" className=" capitalize ">{user.role}</td>
                    <td data-label="price">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded">
                        Block
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
