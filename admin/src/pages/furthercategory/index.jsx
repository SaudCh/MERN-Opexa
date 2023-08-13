import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";

import { LoadingContext } from "../../contexts/loadingContext";
import FurtherCategoryTable from "../../components/tables/furtherCategory";

export default function FurtherCategories() {

    const [data, setData] = useState([])
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {

        const getData = async () => {
            setLoading(true)
            await axios
                .get("furthercategory")
                .then((res) => {
                    setData(res.data.furthercategories)
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
            .delete("furthercategory/" + id)
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
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Further Sub Categories</h1>

                <Link
                    to="/furthercategory/add"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                    Add
                </Link>
            </div>

            <FurtherCategoryTable
                data={data}
                deleteCategory={deleteCategory}
            />
        </div>
    );
}
