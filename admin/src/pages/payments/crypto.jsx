import { Link } from "react-router-dom";
import { where } from "firebase/firestore";
import toast from "react-hot-toast";

import React, { useContext, useEffect, useState } from "react";

import { LoadingContext } from "../../contexts/loadingContext";
import CryptoTable from "../../components/tables/Crypto";
import useFirebase from "../../hooks/useFirebase";

// import axios from "axios";

export default function Categories() {

    const [data, setData] = useState([])
    const { setLoading } = useContext(LoadingContext)
    const { getDocuments, updateDocument } = useFirebase()

    const getData = async () => {
        const res = await getDocuments("crypto", setLoading, where("isDeleted", "==", false))

        if (res.status === 400) {
            toast.error("Error fetching data")
            return
        }

        setData(res.data)

    }

    useEffect(() => {

        getData()

    }, [])

    const deleteCategory = async (id) => {
        await updateDocument("crypto", id, { isDeleted: true }, setLoading)
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
