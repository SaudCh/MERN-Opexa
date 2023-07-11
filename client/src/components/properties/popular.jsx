import React from "react";

function Popular() {
  const populars = [
    {
      name: "Small",
      subName: "Houses",
    },
    {
      name: "New",
      subName: "Houses",
    },
    {
      name: "1 Bedroom",
      subName: "Houses",
    },
    {
      name: "2 Bedroom",
      subName: "Appartments",
    },
    {
      name: "Installment",
      subName: "Appartments",
    },
    {
      name: "Installment",
      subName: "Houses",
    },
    {
      name: "Furnished",
      subName: "Appartments",
    },
    {
      name: "Corner",
      subName: "Houses",
    },
    {
      name: "Corner",
      subName: "Plots",
    },
  ];
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2  py-2">
      {populars.map((popular) => {
        return (
          <div className="w-36 h-32 rounded-md text-gray-700 flex justify-center flex-col items-center border border-gray-200 hover:border-gray-300 hover:shadow">
            <h1 className="font-medium text-gray-700 text-lg">
              {popular.name}
            </h1>
            <h3 className="text-sm text-gray-500 font-light">
              {popular.subName}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default Popular;
