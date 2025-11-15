export interface Comment {
  submission_id: number;
  commented_by: number;
  line_number: number;
  content: string;
}

// User
// id (PK)
// name
// email
// password_hash
// role (submitter/reviewer)
// profile_picture
// created_at

// Project
// id (PK)
// name
// description
// created_by (FK → User.id)
// created_at

// ProjectMembers (many-to-many)
// id (PK)
// project_id (FK → Project.id)
// user_id (FK → User.id)
// role_in_project

// Submission
// id (PK)
// project_id (FK → Project.id)
// submitted_by (FK → User.id)
// code_content (text)
// status (pending, in_review, approved, changes_requested)
// created_at

// Comment
// id (PK)
// submission_id (FK → Submission.id)
// commented_by (FK → User.id)
// line_number (nullable, for inline comments)
// content
// created_at

// Review
// id (PK)
// submission_id (FK → Submission.id)
// reviewer_id (FK → User.id)
// decision (approved, changes_requested)
// remarks
// created_at

// Notification
// id (PK)
// user_id (FK → User.id)
// type (comment, status_change, review)
// message
// is_read
// created_at
