import { query } from "../config/database";
import { Submission } from "../model/submissionModel";

export const createSubmission = async (submission: Submission) : Promise<Submission> => {
  const { rows } = await query(
    `INSERT INTO submissions (project_id,submitted_by,code_content,status) VALUES ($1,$2,$3,$4) RETURNING *`,
    [
      submission.project_id,
      submission.submitted_by,
      submission.code_content,
      submission.status,
    ]
  );
  return rows[0];
};

export const getSubmissionsByProjectId = async (projectId: number) : Promise<Submission[]> => {
  const { rows } = await query(`SELECT * FROM submissions WHERE project_id = $1`, [projectId]);
  return rows;
};

export const getSubmissionById = async (submissionId: number) => {
  const { rows } = await query(`SELECT * FROM submissions WHERE id = $1`, [submissionId]);
  return rows[0];
}


export const updateSubmissionStatus = async (submissionId: number, newStatus: string) : Promise<Submission> => {
  const { rows } = await query(`UPDATE submissions SET status = $1 WHERE id = $2 RETURNING *`, [newStatus, submissionId]);
  return rows[0];
}

export const deleteSubmissionById = async (submissionId: number) : Promise<Submission> => {
  const {rows} = await query(`DELETE FROM submissions WHERE id = $1 RETURNING *`, [submissionId]);
  return rows[0];
}