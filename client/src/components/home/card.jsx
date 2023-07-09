import React from "react";
import "./index.css";
function Card() {
  const details = [
    {
      id: 1,
      name: "Sunglasses",
    },
    {
      id: 2,
      name: "Footwear",
    },
    {
      id: 3,
      name: "Accessories",
    },
  ];
  return (
    <div className="flex justify-center">
      <div className="md:mx-16 mx-4 grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4">
        {details.map((detail) => {
          return (
            <div className="home-back w-[350px] transform hover:scale-105 p-5 h-56 bg-gray-300 flex flex-col justify-center items-start">
              <h1 className="text-lg font-semibold text-gray-800">
                {detail.name}
              </h1>
              <span className="font-semibold mt-2 mb-4 text-gray-800">
                Min 45-70% Off
              </span>
              <button>Shop Now</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
