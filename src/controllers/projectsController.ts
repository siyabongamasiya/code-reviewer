import { Request, Response } from "express";
import * as projectService from "../services/projectsService";
import * as submissionService from "../services/submissionsService";
import * as reviewService from "../services/reviewsService";
import * as commentService from "../services/commentsService";
import {
  calculateAverageReviewTime,
  calculateApprovalRejectionRate,
  calculateReviewerActivity,
  calculateTopCommentedSubmissions,
} from "../utils/utils";

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

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.getAllprojects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const addProjectMember = async (req: Request, res: Response) => {
  try {
    const project_Id = parseInt(req.params.id);
    const { user_Id, role_in_project } = req.body;

    if (!user_Id || !project_Id || !role_in_project) {
      return res
        .status(400)
        .json({ message: "There are missing fields that are required!" });
    }

    const addedUser = await projectService.addProjectMember(
      user_Id,
      project_Id,
      role_in_project
    );
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    const project_Id = parseInt(req.params.id);
    const user_Id = parseInt(req.params.userId);

    const removedUser = await projectService.removeMember(user_Id, project_Id);
    res.status(200).json(removedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const getStatsByProjectId = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);

    const submissions = await submissionService.getSubmissionsByProjectId(projectId)
    const reviews = await reviewService.getReviewsByProjectId(projectId)
    const comments = await commentService.getCommentsByprojectid(projectId)

    const avgReviewTime = calculateAverageReviewTime(submissions, reviews);
    const approvalStats = calculateApprovalRejectionRate(reviews);
    const reviewerActivity = calculateReviewerActivity(reviews);
    const topCommented = calculateTopCommentedSubmissions(comments);

    res.json({
      averageReviewTimeHours: avgReviewTime,
      approvalStats,
      reviewerActivity,
      topCommentedSubmissions: topCommented.slice(0, 5),
    });
  } catch (error) {
    console.error("Error generating stats:", error);
    res.status(500).json({ message: "Error computing stats" });
  }
};
