import { Router } from "express";
import { register } from "../controllers/authenticationController";

const authRouter = Router();

authRouter.post("/register", register)

export default authRouter;