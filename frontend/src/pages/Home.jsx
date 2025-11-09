
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {

  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {

    try {
      const res = await axios.get("http://localhost:4000/api/getalltodo");
      setTasks(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log("error in home page " , error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        📝 Task Manager
      </h1>

      <div className="max-w-md mx-auto bg-white p-5 rounded-xl shadow">
        <TaskForm
          fetchTasks={fetchTasks}
          editTask={editTask}
          setEditTask={setEditTask}
        />
      </div>

      <div className="max-w-md mx-auto mt-6">
        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          setEditTask={setEditTask}
        />
      </div>
    </div>
  );
};

export default Home;

