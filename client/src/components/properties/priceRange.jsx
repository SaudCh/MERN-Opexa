import React from "react";

function PriceRange() {
  const prices = [
    {
      Name: "< 50 lacs",
    },
    {
      Name: "70 Lacs",
    },
    {
      Name: "80 Lacs ",
    },
    {
      Name: "1 Crore",
    },
    {
      Name: "5 Crores",
    },
    {
      Name: "< 10 Crores",
    },
    {
      Name: "50 Crores",
    },
  ];
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2  py-2">
      {prices.map((price) => {
        return (
          <div className="w-36 h-32 rounded-md text-gray-700 flex justify-center flex-col items-center border border-gray-200 hover:border-gray-300 hover:shadow">
            <h3 className="text-sm text-gray-500 font-light">{price.Name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default PriceRange;
