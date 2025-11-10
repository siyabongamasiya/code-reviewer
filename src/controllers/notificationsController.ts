import { Request, Response } from "express";
import * as notificationsService from "../services/notificationsService";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await notificationsService.getNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
