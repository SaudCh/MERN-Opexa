import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryTable from "../../components/tables/category";
import { LoadingContext } from "../../contexts/loadingContext";
import axios from "axios";

// import axios from "axios";

export default function Categories() {

    const [data, setData] = useState([])
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {

        const getData = async () => {
            setLoading(true)

            await axios
                .get("category")
                .then((res) => {
                    setData(res.data.categories)
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

    const deleteCategory = async (id) => {
        setLoading(true)

        await axios
            .delete(`category/${id}`)
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
                <h1 className=" text-2xl font-semibold mr-2">Categories</h1>

                <Link
                    to="/category/add"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                    Add
                </Link>
            </div>

            <CategoryTable
                data={data}
                deleteCategory={deleteCategory}
            />
        </div>
    );
}
