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

export const updateCommentByID = async (commentId: number, newContent: string) : Promise<Comment> => {
    const { rows } = await query(`UPDATE usercomments SET content = $1 WHERE id = $2 RETURNING *`, [newContent, commentId]);
    return rows[0];
}

export const deleteCommentByID = async (commentId: number) : Promise<Comment> => {
    const { rows } = await query(`DELETE FROM usercomments WHERE id = $1 RETURNING *`, [commentId]);
    return rows[0];
}