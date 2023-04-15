import React, { useContext, useEffect } from "react";
import { LoadingContext } from "../../contexts/loadingContext";

const columns = [
  { headerName: "ID" },

  {
    headerName: "Name",
  },
  { headerName: "User" },

  {
    headerName: "Category",
  },
  {
    headerName: "Actions",
  },
];

export default function ProductTable() {
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
                <td data-label="price">01</td>
                <td data-label="id">5 Marla lot</td>
                <td data-label="price">Saud</td>
                <td data-label="id">Property</td>
                <td data-label="actions">
                  <div className="flex flex-row gap-x-2 justify-center">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                      Block
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
