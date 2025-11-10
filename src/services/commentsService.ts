import { query } from "../config/database";
import { Comment } from "../model/commentModel";

export const addComment = async (comment: Comment) :Promise<Comment> => {
  const { rows } = await query(
    `INSERT INTO usercomments (submission_id,commented_by,line_number,content) VALUES ($1,$2,$3,$4) RETURNING *`,
    [
      comment.submission_id,
      comment.commented_by,
      comment.line_number,
      comment.content,
    ]
  );

  return rows[0];
};


export const getCommentsBySubmissionId = async (submissionId: number) : Promise<Comment[]> => {
    const { rows } = await query(`SELECT * FROM usercomments WHERE submission_id = $1`, [submissionId]);
    return rows;
}