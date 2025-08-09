import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";

export const UserRouter = Router();

UserRouter.get("/", getAllUsers);
UserRouter.get("/:id", getUserById);    
UserRouter.post("/", createUser);
UserRouter.put("/:id", updateUser);
UserRouter.delete("/:id", deleteUser);