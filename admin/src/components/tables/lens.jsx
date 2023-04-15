import React, { useContext, useEffect } from "react";
import { LoadingContext } from "../../contexts/loadingContext";

const columns = [
  { headerName: "ID" },

  {
    headerName: "Name",
  },
  
];
export default function LensTable() {
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
                <td data-label="id">Saud</td>
                
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}
