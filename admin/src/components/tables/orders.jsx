import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { LoadingContext } from "../../contexts/loadingContext";

const columns = [
  {
    headerName: "Item",
  },
  {
    headerName: "Buyer",
  },
  {
    headerName: "Seller",
  },
  {
    headerName: "Status",
  },
];
export default function OrderTable({
  orders,
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
                orders.map((order) => (
                  <tr>
                    <td data-label="date">
                      <Link to="/order/id">
                        {order?.product?.title}
                      </Link>
                    </td>
                    <td data-label="name">
                      <Link to="/order/id">
                        {order?.buyer?.name}
                      </Link>
                    </td>
                    <td data-label="price">
                      <Link to="/order/id">
                        {order?.seller?.name}
                      </Link>
                    </td>
                    <td data-label="status">
                      <Link to="/order/id">{order.status}</Link>
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
