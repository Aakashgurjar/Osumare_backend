const express = require("express");
const router = express.Router();
const { getAllTasks , getTaskById  ,createTask , updateTask , deleteTask} = require("../controllers/TaskController");


router.get("/getalltodo", getAllTasks);
router.get("/gettodo/:id", getTaskById);
router.post("/createtodo", createTask);
router.put("/updatetodo/:id", updateTask);
router.delete("/deletetodo/:id", deleteTask);

module.exports = router;
