import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryTable from "../../components/tables/category";
import { collection, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { LoadingContext } from "../../contexts/loadingContext";

// import axios from "axios";

export default function Categories() {

    const [data, setData] = useState([])
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        setLoading(true)
        const q = query(collection(db, "categories"), where("isDeleted", "==", false));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let data = []
            snapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            })
            setData(data)
        });

        setLoading(false)

        // unsubscribe();

        return unsubscribe

    }, [])

    const deleteCategory = async (id) => {
        setLoading(true)

        const categoryRef = doc(db, "categories", id);

        await updateDoc(categoryRef, {
            isDeleted: true
        });

        // const categoryRef = doc(db, "categories", cid);

        // await updateDoc(categoryRef, {
        //     subcategories: arrayRemove(id)
        // });

        setLoading(false)
    }

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Categories</h1>

                <Link
                    to="/category/add"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                    Add
                </Link>
            </div>

            <CategoryTable
                data={data}
                deleteCategory={deleteCategory}
            />
        </div>
    );
}
