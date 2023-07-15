import React, { useContext, useEffect } from 'react'
import useFirebase from '../../hooks/useFirebase'
import { LoadingContext } from '../../contexts/loadingContext'
import { toast } from 'react-hot-toast'
import { dateFormat } from '../../utils/dateTime'
import { increment } from 'firebase/firestore'

export default function Modal({ open, handleClose, id, getData }) {

    const { setLoading } = useContext(LoadingContext)
    const { getIdDocumentRf, updateDocument } = useFirebase()
    const [data, setData] = React.useState({})

    const acceptPayment = async () => {
        const res2 = await updateDocument('wallet', data.userRef.id, { wallet: increment(data.amount) }, setLoading)

        if (res2.status === 400) {
            toast.error("Error updating wallet")
            return
        }

        const res = await updateDocument('payments', id, {
            status: "succeeded",
            amount: data.amount,
            transactionHash: data.transactionHash,
            screenshot: data.screenshot
        }, setLoading)

        if (res.status === 400) {
            toast.error("Error accepting payment")
            return
        }


        toast.success("Payment accepted successfully")
        handleClose()
        getData()
    }

    const declinePayment = async () => {
        const res = await updateDocument('payments', id, { status: "declined" }, setLoading)

        if (res.status === 400) {
            toast.error("Error declining payment")
            return
        }

        toast.success("Payment declined successfully")
        handleClose()
        getData()
    }

    useEffect(() => {
        if (!id) return

        const getPayment = async () => {
            const res = await getIdDocumentRf('payments', id, setLoading, ['userRef'])

            if (res.status === 400) {
                toast.error("Error getting payment")
                handleClose()
                return
            }

            setData(res.data)
        }

        getPayment()

    }, [id])

    return (
        <div id="defaultModal" tabindex="-1" aria-hidden="true" class={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[rgba(0,0,0,0.3)] z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${!open && 'hidden'} `}>
            <div class="relative w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 h-[70vh] overflow-scroll">
                    <div class="sticky top-0 left-0 right-0 bg-white flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Crypto Payment Details
                        </h3>
                        <button
                            onClick={handleClose}
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>

                    <div class="p-4">
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-900 dark:text-gray-100 font-bold">Amount:</span>
                            <span class="text-sm text-gray-900 dark:text-gray-100"> {data.amount}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-900 dark:text-gray-100 font-bold">Status:</span>
                            <span class="text-sm text-gray-900 dark:text-gray-100"> {data.status}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-900 dark:text-gray-100 font-bold">User:</span>
                            <span class="text-sm text-gray-900 dark:text-gray-100"> {data.userRef?.name}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-900 dark:text-gray-100 font-bold">Email:</span>
                            <span class="text-sm text-gray-900 dark:text-gray-100"> {data.userRef?.email}</span>
                        </div>
                        {data.createdAt && <div class="flex justify-between">
                            <span class="text-sm text-gray-900 dark:text-gray-100 font-bold">Date:</span>
                            <span class="text-sm text-gray-900 dark:text-gray-100"> {dateFormat(data.createdAt.toDate())}</span>
                        </div>}
                        <img
                            src={data.screenshot}
                            alt="qr code"
                            className="w-1/2 mx-auto"
                        />
                    </div>

                    <div class="items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">

                        <label class="block text-sm">
                            <span class="text-gray-700 dark:text-gray-400">Amount</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter amount"
                            className="border border-gray-200 rounded-lg px-3 py-2 w-full mb-2"
                            value={data.amount}
                            onChange={(e) => setData({ ...data, amount: e.target.value })}
                        />

                        <label class="block text-sm">
                            <span class="text-gray-700 dark:text-gray-400">Transaction Hash</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter transaction hash"
                            className="border border-gray-200 rounded-lg px-3 py-2 w-full mb-2"
                            value={data.transactionHash}
                            onChange={(e) => setData({ ...data, transactionHash: e.target.value })}
                        />
                        <button
                            onClick={acceptPayment}
                            data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Accept</button>
                        <button
                            onClick={declinePayment}
                            data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
