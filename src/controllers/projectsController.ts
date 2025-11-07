import { Request, Response } from "express";
import * as projectService from "../services/projectsService";

export const addProject = async (req: Request, res: Response) => {
  try {
    const { name, description, created_by } = req.body;
    if (!name || !description || !created_by) {
      return res
        .status(400)
        .json({ message: "There are missing fields that are required!" });
    }

    const newProject = await projectService.addProject({
      name,
      description,
      created_by,
    });

    res.status(201).json(newProject); 

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const  getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await projectService.getAllprojects()
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error })
    }
}
