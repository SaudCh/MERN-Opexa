import React from "react";

function AreaUnit() {
  const areas = [
    {
      name: "3 Marla",
      subName: "Houses",
    },
    {
      name: "4 Marla",
      subName: "Houses",
    },
    {
      name: "7 Marla",
      subName: "Houses",
    },
    {
      name: "5 Marla",
      subName: "Appartments",
    },
    {
      name: "10 Marla",
      subName: "Appartments",
    },
    {
      name: "5 Marla",
      subName: "Houses",
    },
    {
      name: "3 Marla",
      subName: "Appartments",
    },
    {
      name: "7 Marla",
      subName: "Houses",
    },
    {
      name: "10 Marla",
      subName: "Plots",
    },
  ];
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2  py-2">
      {areas.map((area) => {
        return (
          <div className="w-36 h-32 rounded-md text-gray-700 flex justify-center flex-col items-center border border-gray-200 hover:border-gray-300 hover:shadow">
            <h1 className="font-medium text-gray-700 text-lg">{area.name}</h1>
            <h3 className="text-sm text-gray-500 font-light">{area.subName}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default AreaUnit;
