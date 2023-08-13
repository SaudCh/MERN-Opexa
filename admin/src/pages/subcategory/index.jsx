import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { arrayRemove, collection, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { LoadingContext } from "../../contexts/loadingContext";
import SubCategoryTable from "../../components/tables/subcategory";
import axios from "axios";

export default function SubCategories() {

    const [data, setData] = useState([])
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {

        const getData = async () => {
            setLoading(true)

            await axios
                .get("subcategory")
                .then((res) => {
                    setData(res.data.subcategories)
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })

        }

        getData()

    }, [])

    const deleteCategory = async (id, cid) => {
        setLoading(true)
        await axios
            .delete(`subcategory/${id}`)
            .then((res) => {
                setData(data.filter((item) => item._id !== id))
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Sub Categories</h1>

                <Link
                    to="/subcategory/add"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                    Add
                </Link>
            </div>

            <SubCategoryTable
                data={data}
                deleteCategory={deleteCategory}
            />
        </div>
    );
}
