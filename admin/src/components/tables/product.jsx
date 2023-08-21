import React, { useContext, useEffect } from "react";
import { LoadingContext } from "../../contexts/loadingContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const columns = [
  {
    headerName: "Name",
  },
  {
    headerName: "Price",
  },
  {
    headerName: "Category",
  },
  { headerName: "User" },

  {
    headerName: "Actions",
  },
];

export default function ProductTable({ products, getProducts }) {

  const { setLoading } = useContext(LoadingContext)

  const approveProduct = async (id) => {
    setLoading(true);
    await axios
      .patch(`product/approve/${id}`)
      .then((res) => {
        toast.success("Product Approved");
        setLoading(false);
        getProducts();
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const rejectProduct = async (id) => {
    setLoading(true);
    await axios
      .patch(`product/reject/${id}`)
      .then((res) => {
        toast.success("Product Rejected");
        setLoading(false);
        getProducts();
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const blockProduct = async (id) => {
    setLoading(true);
    await axios
      .patch(`product/block/${id}`)
      .then((res) => {
        setLoading(false);
        toast.success("Product Blocked");
        getProducts();
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const unblockProduct = async (id) => {
    setLoading(true);
    await axios
      .patch(`product/unblock/${id}`)
      .then((res) => {
        toast.success("Product Unblocked");
        setLoading(false);
        getProducts();
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const deleteProduct = async (id) => {
    setLoading(true);
    await axios
      .delete(`product/${id}`)
      .then((res) => {
        toast.success("Product Deleted");
        setLoading(false);
        getProducts();
      })
      .finally(() => {
        setLoading(false);
      })
  }



  return (
    <div>
      <div className="block py-2   mx-1 md:mx-2 rounded-md">
        <div className="flex justify-center">
          <table>
            <thead>
              {columns.map((column) => (
                <th>{column.headerName}</th>
              ))}
            </thead>
            <tbody>
              {
                products.map((product) => (

                  <tr>
                    <td data-label="id">{product?.title}</td>
                    <td data-label="price">{product?.price}</td>
                    <td data-label="id">
                      <p>{product?.category?.name}</p>
                      <span className="text-sm text-gray-600">{product?.subcategory?.name}</span>
                      <span className="text-sm text-gray-600">{product?.furthercategory?.name}</span>
                    </td>
                    <td data-label="id">
                      <p>{product?.user?.name}</p>
                      <span className="text-sm text-gray-600">{product?.user?.email}</span>
                    </td>
                    <td data-label="actions">
                      {
                        product?.status === "pending" &&
                        <div className="flex flex-row gap-x-2 justify-center">
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded-md"
                            onClick={() => approveProduct(product?._id)}
                          >

                            Accept
                          </button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded-md"
                            onClick={() => rejectProduct(product?._id)}
                          >
                            Reject
                          </button>
                        </div>
                      }
                      {
                        product?.status === "blocked" &&
                        <div className="flex flex-row gap-x-2 justify-center"
                          onClick={() => unblockProduct(product?._id)}
                        >
                          <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                            Unblock
                          </button>
                        </div>
                      }
                      {
                        product?.status === "active" &&
                        <div className="flex flex-row gap-x-2 justify-center">
                          <button className="bg-red-500 text-white px-2 py-1 rounded-md"
                            onClick={() => blockProduct(product?._id)}
                          >
                            Block
                          </button>
                          <button className="bg-blue-500 text-white px-2 py-1 rounded-md"
                            onClick={() => deleteProduct(product?._id)}
                          >
                            Delete
                          </button>
                        </div>
                      }
                    </td>
                  </tr>
                ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
