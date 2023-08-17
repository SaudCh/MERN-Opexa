import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import React, { useContext, useState } from "react";

import { TextInput } from "../../components/InputFields";
import { LoadingContext } from "../../contexts/loadingContext";


export default function OfflineTransaction() {
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        email: "",
        amount: "",
        rcptnum: ""
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [user, setUser] = useState({})



    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = Validator(data)
        setErrors(errors)
        if (Object.keys(errors).length > 0) return

        setLoading(true)
        await axios
            .post('transcation/create-offline', {
                amount: data.amount,
                currency: 'pkr',
                receiptEmail: user.email,
                uid: user._id,
                rcptnum: data.rcptnum

            })
            .then((res) => {
                toast.success("Payment added successfully")
                navigate('/payments')
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => { setLoading(false) })

    }

    const fetchData = async (e) => {
        e.preventDefault()

        setUser({})

        if (!data.email) {
            toast.error("Email is required")
            return
        }

        setLoading(true)
        await axios
            .get('user/user-by-email/' + data.email)
            .then((res) => {
                setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => { setLoading(false) })


    }



    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Offline Transctions </h1>

                <Link
                    to="/categories"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                    All
                </Link>
            </div>

            <div className="flex flex-col justify-center items-center">
                <form
                    className="grid grid-cols-2 gap-2 w-full md:w-2/3 border p-10 rounded"
                    onSubmit={fetchData}
                >

                    <TextInput
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="Enter email"
                        className="w-full"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        error={errors.email}
                    />

                    <TextInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        className="w-full"
                        disabled={true}
                        error={errors.name}
                        value={user.name}
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-2 py-1 rounded-md mt-4 col-span-2"
                    >
                        Fetch
                    </button>
                </form>

                {user._id && <form
                    className="grid grid-cols-2 gap-2 w-full md:w-2/3 border p-10 rounded mt-2"
                    onSubmit={handleSubmit}
                >

                    <TextInput
                        label="Amount"
                        name="amount"
                        type="number"
                        placeholder="Enter amount"
                        className="w-full"
                        value={data.amount}
                        onChange={(e) => setData({ ...data, amount: e.target.value })}
                        error={errors.amount}

                    />

                    <TextInput
                        label="Recpiet Number"
                        name="rcptnum"
                        type="text"
                        placeholder="Enter recpiet number"
                        className="w-full"
                        value={data.rcptnum}
                        onChange={(e) => setData({ ...data, rcptnum: e.target.value })}
                        error={errors.rcptnum}
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-2 py-1 rounded-md mt-4 col-span-2"
                    >
                        Add
                    </button>
                </form>}

            </div>
        </div>
    );
}

const Validator = (data, image) => {
    let errors = {}

    if (!data.amount) errors.amount = "Amount is required"

    if (!data.rcptnum) errors.rcptnum = "Recpiet number is required"

    return errors
}
