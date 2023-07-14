import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SelectInput, TextInput } from "../../components/InputFields";
import AddImage from "../../components/ImageInput";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { LoadingContext } from "../../contexts/loadingContext";


export default function AddCrypto() {
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        name: "",
        address: "",
    })
    const [errors, setErrors] = useState({})
    const [image, setImage] = useState(null)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const errors = Validator(data, image)
        setErrors(errors)
        if (Object.keys(errors).length > 0) return

        const blob = await fetch(image).then((res) => res.blob())
        const storageRef = ref(storage, "/images/" + new Date().getTime())
        const snapshot = await uploadBytes(storageRef, blob)
        const link = await getDownloadURL(snapshot.ref)

        if (link) {
            const docRef = await addDoc(collection(db, "crypto"), {
                name: data.name,
                image: link,
                address: data.address,
                isDeleted: false
            });

            if (docRef) {
                console.log("success");
                navigate("/crypto")
            }

        } else {
            console.log("error");
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
