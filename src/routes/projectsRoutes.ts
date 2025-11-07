import { Router } from "express";
import { protect } from "../middleware/authMiddleWare";
import { addProject, getAllProjects } from "../controllers/projectsController";

const projectsRoutes = Router();

projectsRoutes.use(protect)

projectsRoutes.post("/",addProject)
projectsRoutes.get("/",getAllProjects)

export default projectsRoutes