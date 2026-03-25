import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../services/userService";
import { JWTPayload } from "../model/jwtPayloadModel";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "Server misconfiguration: JWT_SECRET is not set" });
    }

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedJWT = jwt.verify(token, process.env.JWT_SECRET!);
      const authenticatedUser = await findUserByEmail(
        (decodedJWT as JWTPayload).userEmail,
      );
      req.user = authenticatedUser;
      return next();
    }

    return res.status(401).json({ message: "Not Authorized" });
  } catch (error) {
    const err = error as Error;
    return res.status(401).json({
      message: "Not Authorized",
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
};
