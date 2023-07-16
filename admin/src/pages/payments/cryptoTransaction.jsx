import React, { useContext, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { LoadingContext } from "../../contexts/loadingContext";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { MdArrowCircleUp } from "react-icons/md";
import useFirebase from "../../hooks/useFirebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dateFormat, timeFormat } from "../../utils/dateTime";
import Modal from "./modal";
const columns = [
    { headerName: "Payment ID" },

    {
        headerName: "Date",
    },
    {
        headerName: "Time",
    },
    {
        headerName: "Amount",
    },

    {
        headerName: "Status",
    },
];

export default function Payments() {
    const [data, setData] = React.useState([]);
    const { setLoading } = useContext(LoadingContext);
    const { getDocuments } = useFirebase();
    const [modal, setModal] = React.useState(false);
    const [id, setId] = React.useState("")


    const getProduct = async () => {
        // const res = await getDocuments("payments", setLoading, (where("status", "==", "pending"), where("method", "==", "crypto")));

        // if (res.status === 400) {
        //     toast.error("Error getting payments");
        // }

        let documents = [];
        const q = query(collection(db, 'payments'), where("status", "==", "pending"), where("method", "==", "crypto"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            documents.push({
                id: doc.id,
                ...doc.data()
            })
        });

        setData(documents);

    };


    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div>
            <div className="my-4 px-6 flex flex-row">
                <h1 className=" text-2xl font-semibold mr-2">Payments</h1>


                <div class="inline-flex rounded-md shadow-sm mx-6 " role="group">
                    <button
                        type="button"
                        class="px-4 py-2 text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-l-md hover:bg-gray-100 hover:text-gray-600 focus:z-10 focus:ring-1 focus:ring-gray-700 focus:text-gray-700"
                    >
                        Daily
                    </button>
                    <button
                        type="button"
                        class="px-4 py-2 text-xs font-semibold text-gray-900 bg-white border-t border-b border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-gray-600 focus:z-10 focus:ring-1 focus:ring-gray-700 focus:text-gray-700"
                    >
                        Monthly
                    </button>
                </div>
            </div>


            <div className="block py-4 px-6   md:mx-2 rounded-md">


                <div className="flex justify-center">
                    <table>
                        <thead>
                            {columns.map((column) => (
                                <th >{column.headerName}</th>
                            ))}
                        </thead>
                        <tbody>

                            {
                                data.map((item) => (
                                    <tr
                                        key={item.paymentId}
                                        onClick={() => {
                                            setModal(true)
                                            setId(item.id)
                                        }}
                                    >
                                        <td data-label="id">{item.paymentId}</td>
                                        <td data-label="date">{dateFormat(item.createdAt.toDate())}</td>
                                        <td data-label="date">{timeFormat(item.createdAt.toDate())}</td>
                                        <td data-label="price">{item.amount}</td>
                                        <td data-label="status" className="capitalize">{item.status}</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            {
                modal &&
                <Modal
                    open={modal}
                    handleClose={() => setModal(false)}
                    id={id}
                    getData={getProduct}
                />}
        </div>
    );
}
