import React from "react";

function roundedCard() {
  return (
    <div className=" flex flex-col items-center justify-center transform hover:scale-105  ">
      <img
        decoding="async"
        src="https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg"
        className="h-28 w-28 rounded-full"
      />
      <h1 className="text-center my-3">Men</h1>
    </div>
  );
}

export default roundedCard;
