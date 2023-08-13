import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SelectInput, TextInput } from "../../components/InputFields";
import { db } from "../../config/firebase";
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { LoadingContext } from "../../contexts/loadingContext";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import axios from "axios";


export default function EditCategory() {
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        name: "",
    })
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()
    const [categories, setCategory] = useState([])


    const [inputs, setInput] = useState([{
        name: "",
    }])

    const incInputs = () => {
        setInput([...inputs, { name: "" }])
    }

    const decInputs = (index) => {
        const list = [...inputs]
        list.splice(index, 1)
        setInput(list)
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target
        const list = [...inputs]
        list[index][name] = value
        setInput(list)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)


        const category = doc(db, "subcategories", id);

        await updateDoc(category, {
            name: data.name
        });

        setLoading(false)

    }

    const submitInput = async (e) => {
        e.preventDefault()

        setLoading(true)

        const category = doc(db, "subxcategories", id);

        await updateDoc(category, {
            inputs
        });

        setLoading(false)
    }

    useEffect(() => {

        const getData = async () => {
            setLoading(true)
            await axios
                .get(`subcategory/${id}`)
                .then((res) => {
                    setData(res.data.subcategory)
                    setInput(res.data.category.inputs)
                })
                .catch((err) => {
                })
                .finally(() => {
                    setLoading(false)
                })
        }

        getData()

    }, [id])

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
                <h1 className=" text-2xl font-semibold mr-2">Edit Sub Categories</h1>

                <Link
                    to="/categories"
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

                    <h3 className="text-emerald-500">
                        Basic Info
                    </h3>

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
                        value={
                            categories.find((e) => {
                                return e?.value === data?.category?._id
                            })
                        }
                        isDisabled={true}
                    />

                    <button
                        type="submit"
                        className="bg-emerald-500 text-white px-2 py-1 rounded-md mt-4"
                    >
                        Update
                    </button>

                </div>

            </form>

            <form
                className="flex flex-col justify-center items-center"
                onSubmit={submitInput}
            >
                <div className="flex flex-col w-full md:w-2/3 border p-10 rounded mt-2">
                    <div className="flex flex-row justify-between">
                        <h3 className="text-emerald-500">
                            Inputs
                        </h3>

                        <button
                            type="button"
                            onClick={incInputs}
                        >
                            <AiFillPlusCircle
                                className="text-2xl text-emerald-500 ml-5"
                            />
                        </button>
                    </div>
                    {
                        inputs.map((input, index) => {

                            return (<div className="flex items-center">
                                <div className="flex-1">
                                    <TextInput
                                        name="name"
                                        type="text"
                                        placeholder="Enter Input"
                                        className="w-full"
                                        value={input.name}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => decInputs(index)}
                                >
                                    <AiFillMinusCircle
                                        className="text-2xl text-red-500 ml-5"
                                    />
                                </button>

                            </div>)
                        })
                    }

                    <button
                        type="submit"
                        className="bg-emerald-500 text-white px-2 py-1 rounded-md mt-4"
                    >
                        Update
                    </button>

                </div>
            </form>

        </div>
    );
}
