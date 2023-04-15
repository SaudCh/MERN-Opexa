import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SelectInput, TextInput } from "../../components/InputFields";
import AddImage from "../../components/ImageInput";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../../config/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { LoadingContext } from "../../contexts/loadingContext";


export default function AddSubCategory() {
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        name: "",
    })
    const [categories, setCategory] = useState([])
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const docRef = await addDoc(collection(db, "subcategories"), {
            name: data.name,
            category: data.category,
            subcategories: [],
            inputs: []
        });

        if (docRef) {
            console.log("success");
            navigate("/subcategories")
        }

        setLoading(false)

    }

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
            let data = []
            snapshot.forEach((doc) => {
                // data.push({ id: doc.id, ...doc.data() })
                data.push({ value: doc.id, label: doc.data().name })
            }
            )

            setCategory(data)

        });

        setLoading(false)

        // unsubscribe();

        return unsubscribe

    }, [])

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Add Sub Category</h1>

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
                        // value={
                        //     categories.find((e) => {
                        //         return e.value === data.category.id
                        //     })
                        // }
                        onChange={(e) => setData({
                            ...data, category: {
                                id: e.value,
                                label: e.label
                            }
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
