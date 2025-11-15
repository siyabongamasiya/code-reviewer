import { Request, Response } from "express";
import * as submissionsService from "../services/submissionsService";
import { Submission } from "../model/submissionModel";

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const { project_id, submitted_by, code_content, status } = req.body;
    if (!project_id || !submitted_by || !code_content || !status) {
      return res
        .status(400)
        .json({ message: "There are missing fields that are required!" });
    }
    const newSubmission = await submissionsService.createSubmission({
      project_id,
      submitted_by,
      code_content,
      status,
    } as Submission);
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const getSubmissionByProjectId = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const submissions = await submissionsService.getSubmissionsByProjectId(
      projectId
    );
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  try {
    const submissionId = parseInt(req.params.id);
    const submission = await submissionsService.getSubmissionById(submissionId);
    console.log(submission);
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const updateSubmissionStatus = async (req: Request, res: Response) => {
  try {
    const submissionId = parseInt(req.params.id);
    const newStatus = req.body.status;

    if (!newStatus) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedSubmission = await submissionsService.updateSubmissionStatus(
      submissionId,
      newStatus
    );
    res.status(200).json({
      message: "Status updated successfully",
      updateSubmission: updatedSubmission,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const deleteSubmissionById = async (req: Request, res: Response) => {
  try {
    const submissionId = parseInt(req.params.id);
    const deletedSubmission = await submissionsService.deleteSubmissionById(
      submissionId
    );

    res
      .status(200)
      .json({ message: "Submission deleted successfully", deletedSubmission });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
