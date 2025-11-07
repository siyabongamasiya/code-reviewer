interface Submission {
  project_id: number;
  submitted_by: number;
  code_content: string;
  status: string;
}

// Submission
// id (PK)
// project_id (FK → Project.id)
// submitted_by (FK → User.id)
// code_content (text)
// status (pending, in_review, approved, changes_requested)
// created_at
