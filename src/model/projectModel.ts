export interface Project {
  name: string;
  description: string;
  created_by: number;
}

// Project
// id (PK)
// name
// description
// created_by (FK → User.id)
// created_at
