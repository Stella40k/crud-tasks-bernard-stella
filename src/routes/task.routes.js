import { Router } from "express";
import {
    getAllTasks,
    getTaskById,        
    createTask,
    updateTask,
    
} from "../controllers/task.controller.js";

export const TaskRouter = Router();

TaskRouter.get("/", getAllTasks);
TaskRouter.get("/:id", getTaskById);
TaskRouter.post("/", createTask);
TaskRouter.put("/:id", updateTask);
TaskRouter.delete("/:id", updateTask);  