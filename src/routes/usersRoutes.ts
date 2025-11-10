import { Router } from "express";
import * as userController from "../controllers/userController";
import * as notificationsController from "../controllers/notificationsController";
import { protect } from "../middleware/authMiddleWare";

const userRoutes = Router();
userRoutes.use(protect)

userRoutes.get("/",userController.getAllUsers)
userRoutes.get("/:id",userController.getUserById)
userRoutes.get("/:id/notifications",notificationsController.getNotifications)

export default userRoutes