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
export default function UserTable() {
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
                <td data-label="id">Saud</td>
                <td data-label="date">saudch@gmail.com</td>
                <td data-label="name">Admin</td>
                <td data-label="price">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded">
                    Block
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
