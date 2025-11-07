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

  } catch (error) {}
};
