import { Request,Response } from "express";
import * as reviewsService from "../services/reviewsService";


export const approveSubmission = async (req: Request, res: Response) => {
    try {
        const submissionId = parseInt(req.params.id);
        const approvedSubmission = await reviewsService.approveSubmission(submissionId);
        res.status(200).json(approvedSubmission);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}