import axios from "axios";
import { toast } from "react-hot-toast";

import React, { useContext, useEffect, useState } from "react";
import UserTable from "../../components/tables/users";
import { LoadingContext } from "../../contexts/loadingContext";


export default function Users() {

  const [data, setData] = useState([]);
  const { setLoading } = useContext(LoadingContext)

  const getData = async () => {
    setLoading(true)
    await axios
      .get("user/users?role=user")
      .then((res) => {
        setData(res.data.users)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { setLoading(false) })
  }

  useEffect(() => {
    getData()

  }, [])

  const updateStatus = async (id, status, message) => {

    setLoading(true)
    await axios
      .patch("user/update-status", {
        id: id,
        status: status
      })
      .then((res) => {
        console.log(res);
        toast.success(message)
        getData()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { setLoading(false) })

  }


  return (
    <div className="px-6 ">
      <div className="my-4 flex flex-row">
        <h1 className=" text-2xl font-semibold mr-2">Users Setting</h1>
      </div>
      <UserTable
        data={data}
        updateStatus={updateStatus}
      />
    </div>
  );
}
