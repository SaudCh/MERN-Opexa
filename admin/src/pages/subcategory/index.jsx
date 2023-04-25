import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryTable from "../../components/tables/category";
import { arrayRemove, collection, onSnapshot, query, updateDoc, where } from "firebase/firestore";
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

        const q = query(collection(db, "subcategories"), where("isDeleted", "==", false));
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

        const subcategoryRef = doc(db, "subcategories", id);

        await updateDoc(subcategoryRef, {
            isDeleted: true
        });

        const categoryRef = doc(db, "categories", cid);

        await updateDoc(categoryRef, {
            subcategories: arrayRemove(id)
        });

        // const q = query(collection(db, "subcategories"), where("subcategory", "==", id));
        // const unsubscribe = onSnapshot(q, (snapshot) => {
        //     let data = []
        //     snapshot.forEach((doc) => {
        //         data.push({ ...doc.data(), id: doc.id })
        //     })
        //     setData(data)
        // });

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
