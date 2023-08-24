import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Country, State, City } from 'country-state-city';


import React, { useContext, useEffect, useState } from "react";

import { SelectInput, TextInput } from "../../components/InputFields";
import { LoadingContext } from "../../contexts/loadingContext";

export default function AddArea() {

    const { id } = useParams()
    const { setLoading } = useContext(LoadingContext)
    const [data, setData] = useState({
        name: "",
        city: "",
    })
    const [state, setState] = useState([])
    const [cities, setCities] = useState([])
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        await axios
            .post("area", data)
            .then((res) => {
                toast.success("Area Added Successfully")
                navigate("/areas")
            })
            .finally(() => { setLoading(false) })
    }

    useEffect(() => {
        const getData = async () => {
            const states = State.getStatesOfCountry("PK")
            setState(states.map((item) => {
                return {
                    label: item.name,
                    value: item.isoCode
                }
            }))
        }

        getData()

    }, [])

    useEffect(() => {
        const getData = async () => {
            const cities = City.getCitiesOfState("PK", data.stateCode)
            setCities(cities.map((item) => {
                return {
                    label: item.name,
                    value: item.name
                }
            }))
        }

        getData()

    }, [data.stateCode])

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            await axios
                .get("area/" + id)
                .then((res) => {
                    setData(res.data.area)
                })
                .finally(() => { setLoading(false) })
        }

        getData()

    }, [id])

    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" md:text-2xl font-semibold mr-2">Edit Area</h1>

                <Link
                    to="/areas"
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
                        label="Area"
                        name="area"
                        type="text"
                        placeholder="Enter Area Name"
                        className="w-full"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />

                    <SelectInput
                        label="State"
                        name="state"
                        className="w-full"
                        options={state}
                        onChange={(e) => {
                            setData({
                                ...data, state: e.label, stateCode: e.value
                            })
                        }}
                        value={
                            state.find((item) => item.value === data.stateCode)
                        }
                    />

                    <SelectInput
                        label="City"
                        name="city"
                        className="w-full"
                        options={cities}
                        onChange={(e) => setData({
                            ...data, city: e.value
                        })}
                        value={
                            cities.find((item) => item.value === data.city)
                        }
                    />


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
