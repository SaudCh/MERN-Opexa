import React from "react";
import { MdArrowCircleUp } from "react-icons/md";
import OrderTable from "../../components/tables/orders";
import axios from "axios";

export default function Orders() {

  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const getOrders = async () => {
      await axios.get("bid/active/admin")
        .then((res) => {
          setOrders(res.data.bids);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getOrders();
  }, []);


  return (
    <div className="m-2 px-4">
      <div className="my-4 flex flex-row">
        <h1 className=" text-2xl font-semibold mr-2">Deals</h1>
      </div>
      <OrderTable
        orders={orders}
      />
    </div>
  );
}
