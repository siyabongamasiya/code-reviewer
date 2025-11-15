import { Request, Response } from "express";
import * as reviewsService from "../services/reviewsService";
import { Review } from "../model/reviewModel";

export const makeReview = async (req: Request, res: Response) => {
  try {
    const newReview = await reviewsService.makeReview(req.body as Review);
    res.status(200).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const getReviewHistory = async (req: Request, res: Response) => {
  try {
    const submissionId = parseInt(req.params.id);
    const reviewHistory = await reviewsService.getReviewHistory(submissionId);
    res.status(200).json(reviewHistory);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
