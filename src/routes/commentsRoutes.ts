import { Router } from "express";
import * as commentsController from "../controllers/commentsController";
import { protect } from "../middleware/authMiddleWare";


const commentsRouter = Router();
commentsRouter.use(protect)

commentsRouter.post("/",commentsController.addComment)
commentsRouter.patch("/:id",commentsController.updateCommentByID)

export default commentsRouter;