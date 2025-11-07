import { query } from "../config/database";
import { Project } from "../model/projectModel";

export const addProject = async (project: Project): Promise<Project> => {
  const { name, description, created_by } = project;
  const { rows } = await query(
    `INSERT INTO projects (name,description,created_by) VALUES ($1,$2,$3) RETURNING *`,
    [name, description, created_by]
  );
  return rows[0];
};


export const getAllprojects = async () : Promise<Project[]> => {
  const { rows } = await query(`SELECT * FROM projects`);
  return rows as Project[];
};