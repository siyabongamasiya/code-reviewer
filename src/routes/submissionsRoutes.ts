import { Router } from "express";
import { protect } from "../middleware/authMiddleWare";
import * as submissionsController from "../controllers/submissionsController";


const submissionRoutes = Router();
submissionRoutes.use(protect)


submissionRoutes.post("/",submissionsController.createSubmission)
submissionRoutes.get("/:id",submissionsController.getSubmissionById)
submissionRoutes.post("/:id/status",submissionsController.updateSubmissionStatus)

export default submissionRoutes;