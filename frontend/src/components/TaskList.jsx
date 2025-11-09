import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, fetchTasks, setEditTask }) => {
  if (tasks.length === 0)
    return <p className="text-center text-gray-600">No tasks available</p>;

  return (
    <div className="space-y-3">
        
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          fetchTasks={fetchTasks}
          setEditTask={setEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
