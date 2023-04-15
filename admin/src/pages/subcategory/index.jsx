import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryTable from "../../components/tables/category";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { LoadingContext } from "../../contexts/loadingContext";
import SubCategoryTable from "../../components/tables/subcategory";

// import axios from "axios";

export default function SubCategories() {

    const [data, setData] = useState([])
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onSnapshot(collection(db, "subcategories"), (snapshot) => {
            let data = []
            snapshot.forEach((doc) => {

                data.push({ ...doc.data(), id: doc.id })

            }
            )
            setData(data)
        });

        setLoading(false)

        // unsubscribe();

        return unsubscribe

    }, [])

    const deleteCategory = async (id) => {
        setLoading(true)

        await deleteDoc(doc(db, "categories", id));

        setLoading(false)
    }

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Sub Categories</h1>

                <Link
                    to="/subcategory/add"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                    Add
                </Link>
            </div>

            <SubCategoryTable
                data={data}
                deleteCategory={deleteCategory}
            />
        </div>
    );
}
