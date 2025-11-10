export interface Review {
  submission_id: number;
  reviewer_id: number;
  decision: string;
  remarks: string;
}

// Review
// id (PK)
// submission_id (FK → Submission.id)
// reviewer_id (FK → User.id)
// decision (approved, changes_requested)
// remarks
