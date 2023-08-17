import { Link } from "react-router-dom";
import axios from "axios";

import React, { useContext, useEffect } from "react";
import "./index.css";

import { LoadingContext } from "../../contexts/loadingContext";
import { dateFormat, timeFormat } from "../../utils/dateTime";

const columns = [
  { headerName: "Payment ID" },

  {
    headerName: "Date/Time",
  },
  {
    headerName: "Name",
  },
  {
    headerName: "Email",
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
  const { setLoading } = useContext(LoadingContext);

  const getProduct = async () => {
    setLoading(true);
    await axios.get('transcation/all-payments?status=succeeded')
      .then((res) => {
        setData(res.data.transactions);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { setLoading(false) })
  };


  useEffect(() => {


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

              {
                data.map((item) => (
                  <tr

                  >
                    <td data-label="id">{item.paymentId}</td>
                    <td data-label="date">{dateFormat(item.createdAt)} {timeFormat(item.createdAt)}</td>
                    <td data-label="name">{item.user.name}</td>
                    <td data-label="name">{item.user.email}</td>
                    <td data-label="price">{item.amount}</td>
                    <td data-label="status" className="capitalize">{item.status}</td>
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
