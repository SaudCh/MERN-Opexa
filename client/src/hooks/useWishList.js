import { useEffect, useState } from "react"
import axios from "axios"

export const useWishList = () => {
    const [wishList, setWishlist] = useState([])

    const addToWishlist = (product) => {
        let wl = [...wishList]
        setWishlist((prevWishlist) => [...prevWishlist, product])

        axios.post("/wishlist", { product }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err?.response?.data?.message || err.message)
            setWishlist(wl)
        })

    }

    const removeFromWishlist = (product) => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== product.id))

        axios.delete(`/wishlist/${product.id}`).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err?.response?.data?.message || err.message)
            setWishlist((prevWishlist) => [...prevWishlist, product])
        })
    }

    const inWishlist = (product) => {
        return wishList.some((item) => item.id === product.id)
    }

    const removeAll = () => {
        console.log("remove all")
        setWishlist([])
    }

    const getProduct = async () => {

        await axios.get("/wishlist")
            .then((res) => {
                const response = res.data.wishlist
                setWishlist([])
                response.forEach((item) => {
                    setWishlist((prevWishlist) => [...prevWishlist, item.product])
                })
            })
            .catch((err) => {
                console.log(err?.response?.data?.message || err.message)
            })

    }


    useEffect(() => {
        const getProduct = async () => {

            await axios.get("/wishlist")
                .then((res) => {
                    const response = res.data.wishlist
                    setWishlist([])
                    response.forEach((item) => {
                        setWishlist((prevWishlist) => [...prevWishlist, item.product])
                    })
                })
                .catch((err) => {
                    console.log(err?.response?.data?.message || err.message)
                })

        }
        getProduct()
    }, [])



    return {
        wishList,
        addToWishlist,
        removeFromWishlist,
        inWishlist,
        removeAll,
        getProduct
    }
}

