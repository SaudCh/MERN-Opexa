import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SelectInput, TextInput } from "../../components/InputFields";
import AddImage from "../../components/ImageInput";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../../config/firebase";
import { collection, addDoc, getDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { LoadingContext } from "../../contexts/loadingContext";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";


export default function EditCategory() {
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        name: "",
    })
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()

    const [inputs, setInput] = useState([{
        name: "",
    }])

    const incInputs = () => {
        setInput([...inputs, { name: "" }])
    }

    const decInputs = (index) => {
        const list = [...inputs]
        list.splice(index, 1)
        setInput(list)
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target
        const list = [...inputs]
        list[index][name] = value
        setInput(list)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        let link = data.image

        if (image) {
            const blob = await fetch(image).then((res) => res.blob())
            const storageRef = ref(storage, "/images/" + new Date().getTime())
            const snapshot = await uploadBytes(storageRef, blob)
            link = await getDownloadURL(snapshot.ref)
        }

        const category = doc(db, "categories", id);

        await updateDoc(category, {
            name: data.name,
            image: link
        });

        setLoading(false)

    }

    const submitInput = async (e) => {
        e.preventDefault()

        setLoading(true)

        const category = doc(db, "categories", id);

        await updateDoc(category, {
            inputs
        });

        setLoading(false)
    }

    useEffect(() => {

        const getData = async () => {
            const docRef = doc(db, "categories", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setData(docSnap.data())
                setInput(docSnap.data().inputs)
            } else {
                console.log("No such document!");
            }
        }

        getData()

    }, [id])

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Edit Categories</h1>

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

                    <h3 className="text-emerald-500">
                        Basic Info
                    </h3>

                    <AddImage
                        label="Image"
                        name="image"
                        className="w-full"
                        setImage={setImage}
                        link={data?.image}
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
                        className="bg-emerald-500 text-white px-2 py-1 rounded-md mt-4"
                    >
                        Update
                    </button>

                </div>

            </form>

            <form
                className="flex flex-col justify-center items-center"
                onSubmit={submitInput}
            >
                <div className="flex flex-col w-full md:w-2/3 border p-10 rounded mt-2">
                    <h3 className="text-emerald-500">
                        Inputs
                    </h3>
                    {
                        inputs.map((input, index) => {

                            return (<div className="flex items-center">
                                <div className="flex-1">
                                    <TextInput
                                        name="name"
                                        type="text"
                                        placeholder="Enter Input"
                                        className="w-full"
                                        value={input.name}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                {
                                    index > 0 ? <button
                                        type="button"
                                        onClick={() => decInputs(index)}
                                    >
                                        <AiFillMinusCircle
                                            className="text-2xl text-red-500 ml-5"
                                        />
                                    </button>
                                        :
                                        <button
                                            type="button"
                                            onClick={() => incInputs()}
                                        >
                                            <AiFillPlusCircle
                                                className="text-2xl text-emerald-500 ml-5"

                                            />
                                        </button>
                                }
                            </div>)
                        })
                    }

                    <button
                        type="submit"
                        className="bg-emerald-500 text-white px-2 py-1 rounded-md mt-4"
                    >
                        Update
                    </button>

                </div>
            </form>

        </div>
    );
}
