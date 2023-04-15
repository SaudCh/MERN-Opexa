import React from "react";

export default function AddProduct() {
  return <div className="p-8">
    <div className="flex flex-row justify-center ">
      <img className="rounded-md" style={{width:'150px',height:'150px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP0LOpdyjyPTQWVkoH_HCddvyL9WoWJpr-f_ju4bW02A&s" />
    </div>
    <div className="my-6">
      <h1 className="text-center mb-2 font-semibold text-lg">Glasses Setting</h1>
      <div className="grid grid-cols-4 gap-6 px-2">
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="Title"/>
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="Glass Width"/>
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="$"/>
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="Side Size"/>
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="Lense Size"/>
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="Lense Height"/>
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="Nose Size"/>
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="Shape"/>
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="Color"/>
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="Frame Type"/>
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="Temple Color"/>
       <input type='text' className="border  border-gray-300 p-2 text-sm bg-gray-50  " placeholder="Frame Meterial"/>
      </div>
    </div>
    <div className="my-6">
    <h1 className="text-center mb-2  font-semibold text-lg">Glasses Relation</h1>
    <div className="grid grid-cols-4 gap-6">
    <select id="glass type" class="bg-gray-50 border border-gray-300 text-gray-600 text-sm p-2">
  <option selected>Glass Type</option>
  <option value="1">Type 1</option>
  <option value="2">Type 2</option>
  <option value="3">Type 3</option>
  <option value="4">Type 4</option>
</select>

<select id="glass type" class="bg-gray-50 border border-gray-300 text-gray-600 text-sm p-2">
  <option selected>Collections</option>
  <option value="1">Type 1</option>
  <option value="2">Type 2</option>
  <option value="3">Type 3</option>
  <option value="4">Type 4</option>
</select>

<select id="glass type" class="bg-gray-50 border border-gray-300 text-gray-600 text-sm p-2">
  <option selected>Categories</option>
  <option value="1">Type 1</option>
  <option value="2">Type 2</option>
  <option value="3">Type 3</option>
  <option value="4">Type 4</option>
</select>

<select id="glass type" class="bg-gray-50 border border-gray-300 text-gray-600 text-sm p-2">
  <option selected>Lenses</option>
  <option value="1">Type 1</option>
  <option value="2">Type 2</option>
  <option value="3">Type 3</option>
  <option value="4">Type 4</option>
</select>
    </div>
    </div>
    <div className="my-6">
    <h1 className="text-center mb-2 font-semibold text-lg">Glass Preview</h1>
    <div className="grid grid-cols-4 flex-wrap justify-between">
      <div className="w-66 mr-2 h-36 bg-gray-50 border border-gray-300 flex justify-center items-center text-2xl">+</div>
      <div className="w-66 h-36 mr-2 bg-gray-50 border border-gray-300 flex justify-center items-center text-2xl">+</div>
      <div className="w-66 h-36 mr-2 bg-gray-50 border border-gray-300 flex justify-center items-center text-2xl">+</div>
      <div className="w-66 h-36 mr-2 bg-gray-50 border border-gray-300 flex justify-center items-center text-2xl">+</div>

    </div>
    
    </div>

    <div className="my-6">
    <h1 className="text-center mb-2 font-semibold text-lg">Description</h1>
    <textarea rows='10' className="border border-gray-300 p-2 w-full"
    />
    </div>
  </div>;
}
