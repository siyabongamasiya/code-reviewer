import { Router } from "express";
import { protect } from "../middleware/authMiddleWare";
import { addProject } from "../controllers/projectsController";

const projectsRoutes = Router();

projectsRoutes.use(protect)

projectsRoutes.post("/",addProject)

export default projectsRoutes