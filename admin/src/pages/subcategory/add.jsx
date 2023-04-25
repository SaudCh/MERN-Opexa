import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SelectInput, TextInput } from "../../components/InputFields";
import { db, storage } from "../../config/firebase";
import { collection, addDoc, onSnapshot, updateDoc, arrayUnion, doc, where, query } from "firebase/firestore";
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
            inputs: [],
            isDeleted: false
        });

        const collectionRef = doc(db, "categories", data?.category?.id);

        await updateDoc(collectionRef, {
            subcategories: arrayUnion(docRef.id)
        });


        if (docRef) {
            console.log("success");
            navigate("/subcategories")
        }

        setLoading(false)

    }

    useEffect(() => {
        setLoading(true)
        const q = query(collection(db, "categories"), where("isDeleted", "==", false));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let data = []
            snapshot.forEach((doc) => {
                data.push({
                    label: doc?.data()?.name,
                    value: doc.id
                })
            })
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
