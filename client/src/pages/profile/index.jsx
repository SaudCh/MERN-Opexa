import React from "react";
import DeleteAccount from "../../components/profile/deleteAccount";
function Profile() {
  return (
    <div>
    <div className="w-full flex justify-center items-center my-5">
      <div className="border border-gray-300 p-8 w-[80%] rounded-lg">
        <h1 className="border-b mb-5 pb-3 text-lg font-semibold text-gray-900">
          Edit Profile
        </h1>

        <div className="flex flex-row items-center border-b mb-5 pb-3">
          <div className="mr-3">
            <span className="font-medium text-lg mb-5">Profile Photo</span>
            <img
              className="w-20 h-20 rounded-full"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            />
          </div>
          <div>
            <input
              type="file"
              className="rounded-md "
              placeholder="Upload Photo"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b mb-5 pb-3">
          <div className="">
            <div class="mb-5">
              <label
                for="success"
                class="block mb-2 text-sm font-medium text-gray-700 "
              >
                Name
              </label>
              <input
                type="text"
                class=" border border-gray-500 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 "
                placeholder="Name"
              />
            </div>

            <div className="mb-5">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <select
                id="countries"
                class=" border border-gray-500 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 "
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="no">Prefer Not to say</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
          </div>
          <div className="border border-gray-300 p-5 rounded-md md:h-40 h-56">
            <h1 className="font-semibold mb-2">Why it is Important</h1>
            <p className="text-sm font-light text-gray-700 ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed,
              laudantium iure? Perspiciatis, dolorem voluptatibus. Atque facilis
              dicta aliquam voluptas praesentium facere nesciunt ipsa impedit
              labore odit? Voluptatibus iste fugiat numquam.
            </p>
          </div>
        </div>

        <h1 className="mb-3 text-lg font-semibold text-gray-900">
          Contact Information
        </h1>

        <div className="grid grid-cols-1  items-center md:grid-cols-2 gap-4  mb-5 ">
          <div class="mb-5">
            <label
              for="success"
              class="block mb-2 text-sm font-medium text-gray-700 "
            >
              Mobile
            </label>
            <input
              type="phone"
              class=" border border-gray-500 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 "
              placeholder="03001234567"
            />
          </div>
          <h1 className="hidden md:flex  text-xs font-light text-gray-700">
            This is the number for buyers contacts, reminders, and other
            notifications.
          </h1>

                  </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 border-b mb-5 pb-3">
          <div class="mb-5">
            <label
              for="success"
              class="block mb-2 text-sm font-medium text-gray-700 "
            >
              Email
            </label>
            <input
              type="email"
              class=" border border-gray-500 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 "
              placeholder="xyz@gmail.com"
            />
          </div>
          <h1 className="hidden md:flex  text-xs font-light text-gray-700">
          We won't reveal your email to anyone else nor use it to send you spam
          </h1>
        </div>
      </div>

      </div>

    <DeleteAccount />
    </div>
  );
}

export default Profile;
