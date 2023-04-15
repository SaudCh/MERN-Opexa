import React from "react";
import UserTable from "../../components/tables/users";

export default function Users() {
  return (
    <div className="px-6 ">
      <div className="my-4 flex flex-row">
        <h1 className=" text-2xl font-semibold mr-2">Users Setting</h1>
      </div>
      <UserTable />
    </div>
  );
}
