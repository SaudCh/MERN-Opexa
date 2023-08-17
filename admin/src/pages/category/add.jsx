import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SelectInput, TextInput } from "../../components/InputFields";
import AddImage from "../../components/ImageInput";
import { LoadingContext } from "../../contexts/loadingContext";
import axios from "axios";
import useApi from "../../hooks/useApi";
import { toast } from "react-hot-toast";


export default function Categories() {

    const { uploadImage } = useApi()
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        name: "",
    })
    const [image, setImage] = useState(null)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!image) return toast.error("Please select an image")
        if (!data.name) return toast.error("Please enter name")

        setLoading(true)

        const res = await uploadImage('image', image, setLoading)

        if (res.status === 400) return toast.error(res.data.message)

        await axios.post("category", {
            name: data.name,
            image: res.image
        })
            .then((res) => {
                console.log(res.data);
                toast.success("Category added successfully");
                navigate("/categories");
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })

    }

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Add Categories</h1>

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
                    <AddImage
                        label="Image"
                        name="image"
                        className="w-full"
                        setImage={setImage}
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


                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-2 py-1 rounded-md mt-4"
                    >
                        Add
                    </button>

                </div>
            </form>

        </div>
    );
}
