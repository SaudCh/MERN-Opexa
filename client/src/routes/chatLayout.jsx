import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import chats from "../data/chat";
import ChatsCard from "../components/chat/chatsCard";
import { VscThreeBars } from "react-icons/vsc";

function ChatLayout() {

  const [open, setOpen] = React.useState(true)
  const [filtered, setFiltered] = React.useState(chats)

  const [search, setSearch] = React.useState('')
  const [selected, setSelected] = React.useState('')

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      setSelected(chats.find((chat) => chat.id === id))
    } else {
      setSelected('')
    }
  }, [id])

  // const [messages, setMessages] = React.useState([])


  return (
    <div className={`m-1 md:m-5 justify-evenly flex flex-wrap gap-2`}>
      <div className={`w-full ${open ? "md:w-3/12" : "md:w-2/12 lg:w-1/12"} p-3 bg-white rounded-lg shadow-lg min-h-screen ${!!selected && "hidden md:block"} `}>
        <form className="m-4">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setOpen(!open)}
            >
              <VscThreeBars className="mr-4 mb-2  rounded-lg text-gray-400 cursor-pointer text-2xl" />

            </button>
            <div className={`w-full ${open ? "relative" : "hidden"}`}>
              <input
                type="search"
                id='location-search"'
                className=" p-1.5 w-full focus:ring-gray-300  z-20 text-sm text-gray-800 bg-gray-50 shadow rounded-lg"
                placeholder="Search"
                required
                style={{ border: "none", outline: "none" }}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setFiltered(chats.filter((chat) => chat.name.toLowerCase().includes(e.target.value.toLowerCase())))
                }}
              />

              <button
                type="submit"
                className="absolute top-0 right-0 p-1.5 text-sm font-medium text-gray-400  rounded-r-lg   "
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-3 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        {
          filtered.map((chat) => (
            <ChatsCard
              key={chat.id}
              chat={chat}
              selected={selected}
              setSelected={setSelected}
              // setMessages={setMessages}
              open={open}
            />
          ))
        }
        <ChatsCard
          chat={{
            id: "pre-assessment-questions",
            name: "Pre Assessment Questions",
            lastMessage: "These questions will help me assess your case.",
          }}
          ass
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div >
      <div className={`w-full ${open ? "md:w-8/12 " : " md:w-9/12 lg:w-10/12 "} p-3  bg-white rounded-lg shadow-lg min-h-screen flex flex-col relative`}>
        <Outlet />
      </div>
    </div >
  )
}

export default ChatLayout;
