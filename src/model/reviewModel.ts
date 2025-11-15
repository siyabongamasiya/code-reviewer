export interface Review {
  id:number,
  submission_id: number;
  reviewer_id: number;
  decision: string;
  remarks: string;
  created_at:Date
}

// Review
// id (PK)
// submission_id (FK → Submission.id)
// reviewer_id (FK → User.id)
// decision (approved, changes_requested)
// remarks
