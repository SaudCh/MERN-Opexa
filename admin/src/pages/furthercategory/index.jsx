import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { arrayRemove, collection, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { doc } from "firebase/firestore";
import { LoadingContext } from "../../contexts/loadingContext";
import FurtherCategoryTable from "../../components/tables/furtherCategory";

// import axios from "axios";

export default function FurtherCategories() {

    const [data, setData] = useState([])
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        setLoading(true)

        const q = query(collection(db, "furthercategories"), where("isDeleted", "==", false));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let data = []
            snapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            })
            setData(data)
        });

        setLoading(false)

        return unsubscribe

    }, [])

    const deleteCategory = async (id, cid) => {
        setLoading(true)

        const subcategoryRef = doc(db, "futhercategories", id);

        await updateDoc(subcategoryRef, {
            isDeleted: true
        });

        const categoryRef = doc(db, "subcategories", cid);

        await updateDoc(categoryRef, {
            subcategories: arrayRemove(id)
        });

        setLoading(false)
    }

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Further Sub Categories</h1>

                <Link
                    to="/furthercategory/add"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                    Add
                </Link>
            </div>

            <FurtherCategoryTable
                data={data}
                deleteCategory={deleteCategory}
            />
        </div>
    );
}
