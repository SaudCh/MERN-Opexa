import React, { useContext, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { LoadingContext } from "../../contexts/loadingContext";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { MdArrowCircleUp } from "react-icons/md";
const columns = [
    { headerName: "Payment ID" },
  
    {
      headerName: "Date",
    },
    {
      headerName: "Time",
    },
    {
      headerName: "Amount",
    },
   
    {
      headerName: "Status",
    },
  ];

export default function Payments() {
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
    
    <div className="my-4 px-6 flex flex-row">
        <h1 className=" text-2xl font-semibold mr-2">Payments</h1>
       

        <div class="inline-flex rounded-md shadow-sm mx-6 " role="group">
          <button
            type="button"
            class="px-4 py-2 text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-l-md hover:bg-gray-100 hover:text-gray-600 focus:z-10 focus:ring-1 focus:ring-gray-700 focus:text-gray-700"
          >
            Daily
          </button>
          <button
            type="button"
            class="px-4 py-2 text-xs font-semibold text-gray-900 bg-white border-t border-b border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-gray-600 focus:z-10 focus:ring-1 focus:ring-gray-700 focus:text-gray-700"
          >
            Monthly
          </button>
        </div>
      </div>
  

    <div className="block py-4 px-6   md:mx-2 rounded-md">
   

      <div className="flex justify-center">
        <table>
          <thead>
            {columns.map((column) => (
              <th >{column.headerName}</th>
            ))}
          </thead>
          <tbody>
           
              <tr >
                <td data-label="id">#268FCDs</td>
                <td data-label="date">23-3-2023</td>
                <td data-label="name">10;00 pm Box</td>
                <td data-label="price">Rs 800.00</td>
                <td data-label="status">Received</td>
                
                
              </tr>
           
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}
