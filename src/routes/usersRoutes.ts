import { Router } from "express";
import * as userController from "../controllers/userController";
import { protect } from "../middleware/authMiddleWare";

const userRoutes = Router();
userRoutes.use(protect)

userRoutes.get("/",userController.getAllUsers)
userRoutes.get("/:id",userController.getUserById)

export default userRoutes