import React from "react";
import axios from "axios";

const TaskItem = ({ task, fetchTasks, setEditTask }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure to delete?")) {
      await axios.delete(`http://localhost:4000/api/deletetodo/${task.id}`);
      fetchTasks();
    }
  };

  return (
    <div className="bg-white p-3 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => setEditTask(task)}
          className="bg-orange-400 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
