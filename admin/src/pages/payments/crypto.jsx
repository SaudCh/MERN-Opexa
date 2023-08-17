import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import React, { useContext, useEffect, useState } from "react";

import { LoadingContext } from "../../contexts/loadingContext";
import CryptoTable from "../../components/tables/Crypto";

export default function Categories() {

    const [data, setData] = useState([])
    const { setLoading } = useContext(LoadingContext)

    const getData = async () => {

        setLoading(true)
        await axios.get("crypto")
            .then((res) => {
                setData(res.data.coins)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => { setLoading(false) })
    }

    useEffect(() => {

        getData()

    }, [])

    const deleteCategory = async (id) => {

        setLoading(true)
        await axios.delete(`crypto/${id}`)
            .then((res) => {
                toast.success("Crypto deleted successfully")
                setData(data.filter((item) => item._id !== id))
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => { setLoading(false) })
    }

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Crypto Currencies</h1>

                <Link
                    to="/crypto-add"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                    Add
                </Link>
            </div>

            <CryptoTable
                data={data}
                deleteCategory={deleteCategory}
            />
        </div>
    );
}
