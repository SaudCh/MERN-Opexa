import React from "react";

function SmallCards() {
  return (
    <div>
      <div className="my-5 flex flex-row p-2 transform hover:scale-105  ">
        <img
          src="https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
          className="w-16 h-20 bg-slate-50 rounded-md"
        />
        <div className="ml-2">
          <h1 className="mb-1 text-sm">Glasses</h1>
          <span className=" amount">
            <span className="money text-sm">$100.00</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SmallCards;
