import React from "react";

function DeleteAccount() {
  return (
    <div>
      {" "}
      <div className="w-full flex justify-center items-center my-5">
        <div className="border border-gray-300 p-8 w-[80%] rounded-lg">
          <h1 className="border-b mb-5 pb-3 text-lg font-semibold text-gray-900">
            Delete This Account
          </h1>

          <h1 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete your account?
          </h1>
          <button className="px-4 py-3 my-5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-red-600">
            Yes, Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount;
