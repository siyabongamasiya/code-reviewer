import { query } from "../config/database";
import { Submission } from "../model/submissionModel";


export const approveSubmission = async (submissionId: number) : Promise<Submission> => {
    const {rows} = await query(`UPDATE submissions SET status = 'approved' WHERE id = $1 RETURNING *`,[submissionId]);
    return rows[0];
}