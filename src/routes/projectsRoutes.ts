import { Router } from "express";
import { protect } from "../middleware/authMiddleWare";
import * as projectsController from "../controllers/projectsController";
import * as submissionsController from "../controllers/submissionsController";


const projectsRoutes = Router();

projectsRoutes.use(protect)

projectsRoutes.post("/",projectsController.addProject)
projectsRoutes.get("/",projectsController.getAllProjects)
projectsRoutes.post("/:id/members",projectsController.addProjectMember)
projectsRoutes.post("/:id/submissions",submissionsController.getSubmissionByProjectId)
projectsRoutes.delete("/:id/members/:userId",projectsController.removeMember)

export default projectsRoutes