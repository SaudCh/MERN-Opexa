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
  updateStatus
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
                      {
                        user.status === 'blocked' ?
                          <button
                            onClick={() => updateStatus(user._id, 'active', "user unblocked")}
                            className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded">
                            Unblock
                          </button>
                          :
                          <button
                            onClick={() => updateStatus(user._id, 'blocked', "user blocked")}
                            className="bg-red-500 hover:bg-red-700 text-white p-1 rounded">
                            Block
                          </button>
                      }

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
