import React from "react";

import { MdDone } from "react-icons/md";
function Description() {
  const descrip = [
    {
      id: 1,
      text: " Adjustable Bracelet..",
    },
    {
      id: 2,
      text: "crystal face.",
    },
    {
      id: 3,
      text: "Quartz movement.",
    },
    {
      id: 4,
      text: "Stainless steel/leather.",
    },
    {
      id: 5,
      text: "Day and date function.",
    },
  ];
  return (
    <div className="my-5 md:mx-16 mx-4">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div>
          <h1 className="my-3 text-gray-800 text-lg font-semibold">Brand</h1>
          <p className="text-sm mr-4 leading-relaxed tracking-wide text-gray-700 font-thin">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Dignissimos rerum, tenetur, ducimus fugiat nisi esse obcaecati
            repellendus odit quod in vitae laboriosam, animi eaque recusandae
            sed impedit! Provident, repellat eligendi?
          </p>
          <p className="text-sm mt-4 mr-4 leading-relaxed tracking-wide text-gray-700 font-thin">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Dignissimos rerum, tenetur, ducimus fugiat nisi esse obcaecati
            repellendus odit quod in vitae laboriosam, animi eaque recusandae
            sed impedit! Provident, repellat eligendi?
          </p>
        </div>
        <div>
          <h1 className="my-3 text-gray-800 text-lg font-semibold">
            Product Description
          </h1>
          <p className="text-sm mr-4 leading-relaxed tracking-wide text-gray-700 font-thin">
            Switch up your look with classic, leather, metal and woven accessory
            bands. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
            dapibus leo.Switch up your look with classic, leather, metal and
            woven accessory bands. Ut elit tellus, luctus nec ullamcorper
            mattis, pulvinar dapibus leo.
          </p>
          {descrip.map((des) => {
            return (
              <span className="flex flex-row text-gray-600 text-sm font-thin items-center my-5">
                <MdDone className="text-gray-800 text-xl mr-3 font-bold" />{" "}
                {des.text}
              </span>
            );
          })}
        </div>
        <div>
          <div className="bg-gray-50 flex items-center justify-center ">
            <img
              alt="Men Watch"
              className="transform hover:scale-110 min-h-[150px] bg-transparent"
              src="https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-watch-luxury-watch-transparent-png-image_6687168.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;