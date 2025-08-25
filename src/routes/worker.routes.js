import { Router } from "express";
import { 
    getWorkers,
    getWorkerById,
    createWorker, 
    updateWorker, 
    deleteWorker
} from "../controllers/workers.controller.js";

export const workerRoutes = Router();

workerRoutes.get("/", getWorkers);
workerRoutes.get("/:id", getWorkerById);
workerRoutes.post("/", createWorker);
workerRoutes.put("/:id", updateWorker);
workerRoutes.delete("/:id", deleteWorker);
