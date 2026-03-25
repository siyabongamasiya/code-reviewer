import { Response, Request } from "express";
import * as userService from "../services/userService";
import { User } from "../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, profile_picture } = req.body;
  if (!name || !email || !password) {
    res
      .status(400)
      .json({ message: "There are missing fields that are required!" });
    return;
  }

  try {
    //try to verify if user already exists
    const user = await userService.findUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    //create the user
    const newUser = await userService.createUser({
      name,
      email,
      password,
      profile_picture,
    } as User);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and Password are required!" });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "Server misconfiguration: JWT_SECRET is not set" });
    }

    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(409).json({ message: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const payload = { userId: user.id, userEmail: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "5h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
};
