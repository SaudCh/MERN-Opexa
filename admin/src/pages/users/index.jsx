import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import UserTable from "../../components/tables/users";
import { LoadingContext } from "../../contexts/loadingContext";


export default function Users() {

  const [data, setData] = useState([]);
  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {

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

    getData()

  }, [])

  const blockUser = async (id, cid) => {
    setLoading(true)

    await axios
      .delete("user/" + id)
      .then((res) => {
        toast.success("Further Category Deleted Successfully")
        setData(data.filter((item) => item._id !== id))
      })
      .catch((err) => {
        console.log(err)
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
      />
    </div>
  );
}
