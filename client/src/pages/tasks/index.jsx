import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

import React, { useState, useEffect } from "react";

import Card from "../../components/tasks/card";
import TaskHeader from "../../components/tasks/taskHeader";
import generateRandomId from "../../utils/random";
import BoardView from "../../components/tasks/board";
import ListView from "../../components/tasks/list";

function Tasks() {

  const [view, setView] = useState("board")
  const [lists, setLists] = useState([])

  useEffect(() => {

    const list = [
      {
        name: "John Doe",
        id: generateRandomId(),
        tasks: [
          {
            id: generateRandomId(),
            status: "cancelled",
            name: "Task 1",
            createdDate: "2023-06-18",
            dueDate: "2023-06-25",
            assignTo: 1,
            numFiles: 3,
            authorName: "Jane Smith",
            authorImage: "https://example.com/avatar1.jpg"
          },

        ]
      },
      {
        name: "Jane Smith",
        id: generateRandomId(),
        tasks: [
          {
            id: generateRandomId(),
            status: "pending",
            name: "Task 2",
            createdDate: "2023-06-19",
            dueDate: "2023-06-26",
            assignTo: 2,
            numFiles: 1,
            authorName: "John Doe",
            authorImage: "https://example.com/avatar2.jpg"
          },
          {
            id: generateRandomId(),
            status: "done",
            name: "Task 3",
            createdDate: "2023-06-20",
            dueDate: "2023-06-27",
            assignTo: 1,
            numFiles: 2,
            authorName: "John Doe",
            authorImage: "https://example.com/avatar1.jpg"
          },

        ]
      },
      {
        name: "John Doe",
        id: generateRandomId(),
        tasks: [
          {
            id: generateRandomId(),
            status: "pending",
            name: "Task 4",
            createdDate: "2023-06-21",
            dueDate: "2023-06-28",
            assignTo: 2,
            numFiles: 0,
            authorName: "Jane Smith",
            authorImage: "https://example.com/avatar2.jpg"
          },
          {
            id: generateRandomId(),
            status: "cancelled",
            name: "Task 5",
            createdDate: "2023-06-22",
            dueDate: "2023-06-29",
            assignTo: 1,
            numFiles: 0,
            authorName: "Jane Smith",
            authorImage: "https://example.com/avatar1.jpg"
          },
          {
            id: generateRandomId(),
            status: "done",
            name: "Task 6",
            createdDate: "2023-06-23",
            dueDate: "2023-06-30",
            assignTo: 2,
            numFiles: 0,
            authorName: "Jane Smith",
            authorImage: "https://example.com/avatar2.jpg"
          }
        ]
      }
      // Add more objects as needed
    ];


    setLists(list)
  }, [])

  return (
    <div>
      <TaskHeader view={view} setView={setView} />

      <div className={view === "board" ? "m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 " : ""}>
        {
          lists.map((list) =>
            view === "board" ? <BoardView list={list} key={list?.id} /> : <ListView list={list} key={list.index} />
          )
        }
        <div>
          {/* <Modal /> */}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
