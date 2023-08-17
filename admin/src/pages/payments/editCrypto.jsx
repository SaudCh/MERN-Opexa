import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import React, { useContext, useEffect, useState } from "react";

import { TextInput } from "../../components/InputFields";
import AddImage from "../../components/ImageInput";
import { LoadingContext } from "../../contexts/loadingContext";
import useApi from "../../hooks/useApi";


export default function EditCrypto() {

    const { cid } = useParams()
    const { uploadImage } = useApi()
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

        const res = image ? await uploadImage('image', image, setLoading) : { status: 200, image: data.image }

        if (res.status === 400) return

        await axios.patch("crypto/" + cid, {
            name: data.name,
            image: res.image,
            address: data.address,
        })
            .then((res) => {
                toast.success("Crypto added successfully");
                navigate("/crypto");
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })

    }

    useEffect(() => {
        const fetchCrypto = async () => {
            await axios.get(`crypto/${cid}`)
                .then((res) => {
                    setData(res.data.coin);
                    // setData(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => { setLoading(false) })

        }

        fetchCrypto()
    }, [])


    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Add Crypto Currency</h1>

                <Link
                    to="/crypto"
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
                        phImg={import.meta.env.VITE_SERVER_URL + data.image}
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

    if (!data.name) {
        errors.name = "Name is required"
    }

    if (!data.address) {
        errors.address = "Address is required"
    }

    return errors
}
