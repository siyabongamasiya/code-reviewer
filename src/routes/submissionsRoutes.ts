import { Router } from "express";
import { protect } from "../middleware/authMiddleWare";
import * as submissionsController from "../controllers/submissionsController";
import * as commentsController from "../controllers/commentsController";
import * as reviewsController from "../controllers/reviewsController";






const submissionRoutes = Router();
submissionRoutes.use(protect)

submissionRoutes.post("/",submissionsController.createSubmission)
submissionRoutes.get("/:id",submissionsController.getSubmissionById)
submissionRoutes.post("/:id/comments",commentsController.addComment)
submissionRoutes.get("/:id/comments",commentsController.getCommentsBySubmissionId)
submissionRoutes.delete("/:id",submissionsController.deleteSubmissionById)
submissionRoutes.patch("/:id/approve",reviewsController.approveSubmission)
submissionRoutes.post("/:id/status",submissionsController.updateSubmissionStatus)

export default submissionRoutes;