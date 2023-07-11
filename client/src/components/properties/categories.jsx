import React from "react";

function Categories() {
  const category = [
    {
      Name: "Houses",
    },
    {
      Name: "Houses",
    },
    {
      Name: "Houses",
    },
    {
      Name: "Appartments",
    },
    {
      Name: "Appartments",
    },
    {
      Name: "Houses",
    },
    {
      Name: "Appartments",
    },
    {
      Name: "Houses",
    },
    {
      Name: "Plots",
    },
  ];
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2  py-2">
      {category.map((cat) => {
        return (
          <div className="w-36 h-32 rounded-md text-gray-700 flex justify-center flex-col items-center border border-gray-200 hover:border-gray-300 hover:shadow">
            <h3 className="text-sm text-gray-500 font-light">{cat.Name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
