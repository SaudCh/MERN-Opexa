import React from "react";

function Card() {
  return (
    <div className="w-[90%] md:w-[350px] transform hover:scale-105   p-5 h-56 bg-gray-300 flex flex-col justify-center items-start">
      <h1 className="text-lg font-semibold text-gray-800">Sunglasses</h1>
      <span className=" font-semibold mt-2 mb-4 text-gray-800">
        Min 45-70% Off
      </span>
      <button>Shop Now</button>
    </div>
  );
}

export default Card;
