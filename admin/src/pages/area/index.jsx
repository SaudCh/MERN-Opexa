import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";

import { LoadingContext } from "../../contexts/loadingContext";
import FurtherCategoryTable from "../../components/tables/furtherCategory";
import AreaTable from "../../components/tables/area";

export default function Areas() {

    const [data, setData] = useState([])
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {

        const getData = async () => {
            setLoading(true)
            await axios
                .get("area")
                .then((res) => {
                    setData(res.data.areas)
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => { setLoading(false) })
        }

        getData()

    }, [])

    const deleteCategory = async (id, cid) => {
        setLoading(true)

        await axios
            .delete("area/" + id)
            .then((res) => {
                toast.success("Area Deleted Successfully")
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
                <h1 className=" text-2xl font-semibold mr-2">Area</h1>

                <Link
                    to="/area/add"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                    Add
                </Link>
            </div>

            <AreaTable
                data={data}
                deleteCategory={deleteCategory}
            />
        </div>
    );
}
