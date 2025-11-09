import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks, editTask, setEditTask }) => {
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (editTask) setForm(editTask);
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!form.title || !form.description)
      return alert("Please fill all fields");

    
    try {
      if (editTask) {
        await axios.put(`http://localhost:4000/api/updatetodo/${editTask.id}`, form);
        setEditTask(null);
      } else {
        await axios.post("http://localhost:4000/api/createtodo", form);
      }
      setForm({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("error in task form " , error );
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <textarea
        placeholder="Task Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      ></textarea>
      <button
        type="submit"
        className={`w-full p-2 text-white rounded ${
          editTask ? "bg-orange-500" : "bg-green-600"
        }`}
      >
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
