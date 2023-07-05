import React from "react";

function roundedCard() {
  const details = [
    {
      id: 1,
      name: "Man",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 2,
      name: "Woman",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 3,
      name: "kids",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 4,
      name: "Shoes",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 5,
      name: "Bags",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 6,
      name: "Watches",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 7,
      name: "Sports",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
    {
      id: 8,
      name: "Accessories",
      url: "https://pressmart.presslayouts.com/wp-content/uploads/2022/04/Men-Category-150x150.jpg",
    },
  ];

  return (
    <div className="md:mx-16 ml-[-20px] my-5 p-5 items-center justify-center grid grid-cols-2 md:grid-cols-6 xl:grid-cols-8  ">
      {details.map((detail) => (
        <div className=" flex flex-col items-center justify-center  ">
          <img
            decoding="async"
            src={detail.url}
            className="h-28 w-28 rounded-full  transform hover:scale-105"
          />
          <h1 className="text-center my-3">{detail.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default roundedCard;
