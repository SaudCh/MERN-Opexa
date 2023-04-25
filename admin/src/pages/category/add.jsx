import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SelectInput, TextInput } from "../../components/InputFields";
import AddImage from "../../components/ImageInput";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { LoadingContext } from "../../contexts/loadingContext";


export default function Categories() {
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        name: "",
    })
    const [image, setImage] = useState(null)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const blob = await fetch(image).then((res) => res.blob())
        const storageRef = ref(storage, "/images/" + new Date().getTime())
        const snapshot = await uploadBytes(storageRef, blob)
        const link = await getDownloadURL(snapshot.ref)

        if (link) {
            const docRef = await addDoc(collection(db, "categories"), {
                name: data.name,
                image: link,
                inputs: [],
                subcategories: [],
                isDeleted: false
            });

            if (docRef) {
                console.log("success");
                navigate("/categories")
            }

        } else {
            console.log("error");
        }

        setLoading(false)

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
