import { Request, Response } from "express";
import * as commentsService from "../services/commentsService";

export const addComment = async (req: Request, res: Response) => {
  try {
    const comment = req.body;
    const newComment = await commentsService.addComment(comment);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const getCommentsBySubmissionId = async (
  req: Request,
  res: Response
) => {
  try {
    const submissionId = parseInt(req.params.id);
    const comments = await commentsService.getCommentsBySubmissionId(
      submissionId
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const updateCommentByID = async (req: Request, res: Response) => {
    try {
        console.log("got here!")
        const commentId = parseInt(req.params.id);
        const newContent = req.body.content;
        const updatedComment = await commentsService.updateCommentByID(commentId, newContent);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error })
    }
}
