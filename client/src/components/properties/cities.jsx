import React from "react";

function Cities() {
  const city = [
    {
      Name: "Lahore",
    },
    {
      Name: "Karachi",
    },
    {
      Name: "Gujranwala",
    },
    {
      Name: "Multan",
    },
    {
      Name: "Sialkot",
    },
    {
      Name: "Rawalpindi",
    },
    {
      Name: "Islamabad",
    },
    {
      Name: "Faislabad",
    },
    {
      Name: "Gujrat",
    },
  ];
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2  py-2">
      {city.map((cit) => {
        return (
          <div className="w-36 h-32 rounded-md text-gray-700 flex justify-center flex-col items-center border border-gray-200 hover:border-gray-300 hover:shadow">
            <h3 className="text-sm text-gray-500 font-light">{cit.Name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Cities;
