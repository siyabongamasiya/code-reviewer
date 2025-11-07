import {Response,Request} from "express";
import * as userService from "../services/userService";
import { User } from "../model/userModel";


export const register = async (req: Request, res: Response) => {
  const { name, email, password, role, profile_picture } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "There are missing fields that are required!" });
    return;
  }

  try {
    //try to verify if user already exists
    const user = await userService.findUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    //create the user
    const newUser = await userService.createUser({ name, email, password, role, profile_picture } as User);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};