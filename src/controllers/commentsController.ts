import { Request,Response } from "express";
import * as commentsService from "../services/commentsService";



export const addComment = async (req: Request, res: Response) => {
    try {
        const comment = req.body;
        const newComment = await commentsService.addComment(comment);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}