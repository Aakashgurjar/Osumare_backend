const express = require("express");

let tasks = [];
let nextId = 1;

exports.getAllTasks = (req, res) => {
  try {
    let result = [...tasks];

    const { title, completed, page = 1, limit = 5, sortBy } = req.query;

    if (title) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (completed) {
      result = result.filter(
        (t) => t.completed === (completed === "true" ? true : false)
      );
    }

    if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "id") {
      result.sort((a, b) => a.id - b.id);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginated = result.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      total: result.length,
      page: parseInt(page),
      limit: parseInt(limit),
      data: paginated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};



exports.getTaskById = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "todo not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};



exports.createTask = (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newTask = {
      id: nextId++,
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    console.log(tasks);
    res.status(201).json({
      success: true,
      message: "todo created successfully",
      data: newTask,
    });
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



exports.updateTask = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    const { title, description, completed } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    task.title = title;
    task.description = description;
    task.completed = completed ?? task.completed;

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Todo  not updated",
    });
  }
};



exports.deleteTask = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex((t) => t.id === taskId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    const deletedTask = tasks.splice(index, 1);
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: deletedTask[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Todo  not deleted ",
    });
  }
};
