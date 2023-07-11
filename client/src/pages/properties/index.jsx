import React from "react";
import LeftCol from "../../components/properties/leftCol";
import { Outlet } from "react-router-dom";
import FilterLayout from "../../routes/filterLayout";
function Properties() {
  return (
    <div>
      <div className="my-5  md:mx-16 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <LeftCol />
          </div>
          <div className="md:col-span-2">
            <FilterLayout />
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default Properties;
