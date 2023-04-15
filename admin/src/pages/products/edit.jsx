import React from "react";

export default function EditProducts() {
  return (
    <div className="px-6 my-4">
    <div className="my-4 flex flex-row justify-between px-4">
    <h1 className=" text-2xl font-semibold mr-2">Edit Product</h1>
 
  </div>
    <div class="rounded-md flex justify-end mb-1 mr-2">
      <Link
        to="/cotegory"
        aria-current="page"
        class="py-2 px-4 text-sm font-medium bg-white rounded-l-lg border"
      >
        All
      </Link>
      <Link
        to="/catagory/add"
        class="py-2 px-4 text-sm font-medium text-gray-900 bg-[#fff] rounded-r-md border border-gray-200 hover:bg-gray-100"
      >
        Add
      </Link>
    </div>

    <div className="px-6 my-4">
      <div
        className="w-full  h-60 flex justify-center items-center rounded-md"
        style={{
          backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCgLfOUPuGL9pabLSdHjF3RsU8ovnkAtlvU5lZJMGW&s")`,
          backgroundRepeat: "no-repeat",
          backgroundSize:'100%',
          
        }}
      >
        <button className="bg-blue-500 text-white rounded-md px-3 py-1">Edit Product</button>
      </div>
      <input className="border border-gray-400  my-4 px-3 py-1 w-full
      "
      placeholder="Name"
      />
      <div className="flex flex-row justify-center"
      >
        <button className="px-3 py-1 rounded-md text-white bg-blue-500">Save</button>
      </div>
    </div>
  </div>
  );
}
