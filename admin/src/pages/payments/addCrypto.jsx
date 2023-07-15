import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import React, { useContext, useState } from "react";

import { TextInput } from "../../components/InputFields";
import AddImage from "../../components/ImageInput";
import { LoadingContext } from "../../contexts/loadingContext";
import useFirebase from "../../hooks/useFirebase";


export default function AddCrypto() {

    const { uploadImage, addDocument } = useFirebase()
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        name: "",
        address: "",
        isDeleted: false
    })
    const [errors, setErrors] = useState({})
    const [image, setImage] = useState(null)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()


        const errors = Validator(data, image)
        setErrors(errors)
        if (Object.keys(errors).length > 0) return
        setLoading(true)

        const res = await uploadImage(image)

        if (res.status === 400) {
            toast.error("Error uploading image")
            return
        }

        const res1 = await addDocument("crypto", { ...data, image: res.data })

        console.log(res1)

        if (res1.status === 200) {
            toast.success("Crypto Currency added successfully")
            navigate("/crypto")
        } else {
            toast.error("Error adding crypto currency")
        }

        setLoading(false)

    }

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Add Crypto Currency</h1>

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
                        label="Icon"
                        name="image"
                        className="w-full"
                        setImage={setImage}
                        buttonText="Upload Icon"
                        phImg={"https://cdn.pixabay.com/photo/2021/04/30/16/46/bitcoin-icon-6219383_1280.png"}
                        error={errors.image}
                    />

                    <TextInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        className="w-full"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        error={errors.name}
                    />

                    <TextInput
                        label="Address"
                        name="address"
                        type="text"
                        placeholder="Enter address"
                        className="w-full"
                        value={data.address}
                        onChange={(e) => setData({ ...data, address: e.target.value })}
                        error={errors.address}
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

const Validator = (data, image) => {
    let errors = {}

    if (!image) {
        errors.image = "Image is required"
    }

    if (!data.name) {
        errors.name = "Name is required"
    }

    if (!data.address) {
        errors.address = "Address is required"
    }

    return errors
}
