import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

import React, { useContext, useEffect, useState } from "react";

import useApi from "../../hooks/useApi";
import AddImage from "../../components/ImageInput";
import { TextInput } from "../../components/InputFields";
import { LoadingContext } from "../../contexts/loadingContext";


export default function EditCategory() {
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        name: "",
    })
    const [image, setImage] = useState(null)
    const { uploadImage } = useApi()
    const navigate = useNavigate()
    const { id } = useParams()

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

        let imageUrl = data.image

        if (image) {
            const res = await uploadImage('image', image, setLoading)

            if (res.status === 400) {
                toast.error(res.message)
                return
            }

            imageUrl = res.image
        }

        await axios.patch(`category/${id}`, {
            name: data.name,
            image: imageUrl,
            location: data.location
        })
            .then((res) => {
                toast.success(res.data.message)
                navigate("/categories")
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })

    }

    const submitInput = async (e) => {
        e.preventDefault()

        setLoading(true)
        await axios.patch(`category/${id}`, {
            inputs: inputs
        })
            .then((res) => {
                toast.success("Inputs Updated")
                navigate("/categories")
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
            await axios
                .get(`category/${id}`)
                .then((res) => {
                    setData(res.data.category)
                    setInput(res.data.category.inputs)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getData()

    }, [id])

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Edit Categories</h1>

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

                    <AddImage
                        label="Image"
                        name="image"
                        className="w-full"
                        setImage={setImage}
                        link={import.meta.env.VITE_SERVER_URL + data?.image}
                    />

                    <TextInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        className="w-full"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />

                    <div class="flex items-center mb-4">
                        <input
                            id="default-checkbox"
                            type="checkbox"
                            checked={data.location}
                            onChange={(e) => setData({ ...data, location: !data.location })}
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Location Enabled</label>
                    </div>

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
