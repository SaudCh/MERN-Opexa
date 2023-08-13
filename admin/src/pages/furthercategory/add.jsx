import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";

import { SelectInput, TextInput } from "../../components/InputFields";
import { LoadingContext } from "../../contexts/loadingContext";

export default function AddFurtherCategory() {
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        name: "",
        category: "",
        subcategory: ""
    })
    const [categories, setCategory] = useState([])
    const [subcategories, setSubCategory] = useState([])
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        await axios
            .post("furthercategory", data)
            .then((res) => {
                toast.success("Further Category Added Successfully")
                navigate("/furthercategories")
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })

    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            await axios
                .get("category")
                .then((res) => {
                    setCategory(res.data.categories.map((item) => {
                        return {
                            value: item._id,
                            label: item.name
                        }
                    }))
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

    useEffect(() => {
        if (!data?.category) return

        const getData = async () => {
            setLoading(true)
            await axios
                .get(`subcategory?category=${data?.category}`)
                .then((res) => {
                    setSubCategory(res.data.subcategories.map((item) => {
                        return {
                            value: item._id,
                            label: item.name
                        }
                    }))
                }
                )
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }

        getData()

    }, [data.category])

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" md:text-2xl font-semibold mr-2">Add Further Sub Category</h1>

                <Link
                    to="/furthercategories"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                    All
                </Link>
            </div>

            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col w-full md:w-2/3 border p-10 rounded">

                    <TextInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        className="w-full"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />

                    <SelectInput
                        label="Category"
                        name="category"
                        className="w-full"
                        options={categories}
                        onChange={(e) => setData({
                            ...data, category: e.value
                        })}
                    />

                    <SelectInput
                        label="Sub Category"
                        name="subcategory"
                        className="w-full"
                        options={subcategories}
                        onChange={(e) => setData({
                            ...data, subcategory: e.value
                        })}
                    />


                    <button
                        type="submit"
                        className="bg-emerald-500 text-white px-2 py-1 rounded-md mt-4"
                    >
                        Add
                    </button>

                </div>
            </form>

        </div>
    );
}
