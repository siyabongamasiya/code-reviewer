import { query } from "../config/database";
import { Review } from "../model/reviewModel";
import { Submission } from "../model/submissionModel";

export const makeReview = async (review: Review): Promise<Review> => {
  const { submission_id, reviewer_id, decision, remarks } = review;
  const { rows } = await query(
    `INSERT INTO reviews (submission_id,reviewer_id,decision,remarks) VALUES ($1,$2,$3,$4) RETURNING *`,
    [submission_id, reviewer_id, decision, remarks]
  );
  return rows[0];
};

export const getReviewHistory = async (
  submissionId: number
): Promise<Review[]> => {
  const { rows } = await query(
    `SELECT * FROM reviews WHERE submission_id = $1`,
    [submissionId]
  );
  return rows;
};

export const getReviews = async (): Promise<Review[]> => {
  const { rows } = await query(`SELECT * FROM reviews`);
  return rows;
};

export const getReviewsByProjectId = async (
  projectId: number
): Promise<Review[]> => {
  const { rows } = await query(
    `SELECT r.*
       FROM reviews r
       JOIN submissions s ON r.submission_id = s.id
       WHERE s.project_id = $1`,
    [projectId]
  );
  return rows;
};
