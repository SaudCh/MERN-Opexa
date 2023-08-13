import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SelectInput, TextInput } from "../../components/InputFields";
import { LoadingContext } from "../../contexts/loadingContext";
import axios from "axios";
import { toast } from "react-toastify";


export default function AddSubCategory() {
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        name: "",
    })
    const [categories, setCategory] = useState([])
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!data.name) return toast.error("Please enter name")
        if (!data.category) return toast.error("Please select category")

        setLoading(true)

        await axios.post("subcategory", {
            name: data.name,
            category: data.category,
        })
            .then((res) => {
                console.log(res.data);
                toast.success("Subcategory added successfully");
                navigate("/subcategories");
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })

    }

    useEffect(() => {

        const getData = async () => {
            setLoading(true)

            await axios.get("category")
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
                    console.log("done")
                    setLoading(false)
                })

        }

        getData()
    }, [])

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Add Sub Category</h1>

                <Link
                    to="/subcategories"
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
