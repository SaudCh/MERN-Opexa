import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { LoadingContext } from "../../contexts/loadingContext";

const columns = [
  { headerName: "Order ID" },

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
export default function OrderTable() {
  const [data, setData] = React.useState([]);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);

      setIsLoading(false);
    };

    getProduct();
  }, []);

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
              <tr>
                <td data-label="id">
                  <Link to="/order/id">#268FCDs</Link>
                </td>
                <td data-label="date">
                  <Link to="/order/id">Car</Link>
                </td>
                <td data-label="name">
                  <Link to="/order/id">Abid</Link>
                </td>
                <td data-label="price">
                  <Link to="/order/id">Daud</Link>
                </td>
                <td data-label="status">
                  <Link to="/order/id">Active</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
