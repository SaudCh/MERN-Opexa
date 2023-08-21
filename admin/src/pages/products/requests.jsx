import axios from "axios";

import React, { useContext } from "react";
import ProductTable from "../../components/tables/product";
import { Link } from "react-router-dom";
import { LoadingContext } from "../../contexts/loadingContext";
import ButtonGroup from "../../components/buttonGroup";
export default function ProductsRequest() {

    const [products, setProducts] = React.useState([]);
    const { setLoading } = useContext(LoadingContext)

    const getProducts = async () => {
        setLoading(true);
        await axios
            .get("product?status=pending")
            .then((res) => {
                setProducts(res.data.products);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    React.useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            await axios
                .get("product?status=pending")
                .then((res) => {
                    setProducts(res.data.products);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        getProducts();
    }, []);


    return (
        <div className="px-6 ">
            <div className="my-4 flex flex-row justify-between px-4">
                <h1 className=" text-2xl font-semibold mr-2">Products</h1>
                <ButtonGroup
                    btn1txt="Active"
                    btn2txt="Request"
                    link1="/products"
                    link2="/products/requests"
                />
            </div>


            <ProductTable
                products={products}
                getProducts={getProducts}
            />
        </div>
    );
}
