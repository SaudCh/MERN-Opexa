import React from "react";
import ProductTable from "../../components/tables/product";
import { Link } from "react-router-dom";
export default function Products() {
  return (
    <div className="px-6 ">
      <div className="my-4 flex flex-row justify-between px-4">
        <h1 className=" text-2xl font-semibold mr-2">Products</h1>
      </div>

      <ProductTable />
    </div>
  );
}
