import { query } from "../config/database";
import { ProjectMember } from "../model/projectMembersmodels";
import { Project } from "../model/projectModel";
import { User } from "../model/userModel";

export const addProject = async (project: Project): Promise<Project> => {
  const { name, description, created_by } = project;
  const { rows } = await query(
    `INSERT INTO projects (name,description,created_by) VALUES ($1,$2,$3) RETURNING *`,
    [name, description, created_by]
  );
  return rows[0];
};

export const getAllprojects = async (): Promise<Project[]> => {
  const { rows } = await query(`SELECT * FROM projects`);
  return rows as Project[];
};

export const addProjectMember = async (
  userId: number,
  projectId: number,
  role: string
): Promise<User> => {
  const { rows } = await query(
    `INSERT INTO projectmembers (project_id,user_id,role_in_project) VALUES ($1,$2,$3) RETURNING *`,
    [userId, projectId, role]
  );
  const projectMember: ProjectMember = rows[0];
  const { rows: users } = await query(`SELECT * FROM users WHERE id = $1`, [
    projectMember.user_id,
  ]);
  return users[0];
};

export const removeMember = async (
  userId: number,
  projectId: number
): Promise<User> => {
  await query(
    `DELETE FROM projectmembers WHERE project_id = $1 AND user_id = $2 RETURNING *`,
    [userId, projectId]
  );

  const { rows: users } = await query(`SELECT * FROM users WHERE id = $1`, [
    userId,
  ]);
  return users[0];
};
