import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../services/userService";
import { JWTPayload } from "../model/jwtPayloadModel";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log(req.headers.authorization, "bearer");
    const token = req.headers.authorization.split(" ")[1];
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET!);
    const authenticatedUser = await findUserByEmail(
      (decodedJWT as JWTPayload).userEmail
    );
    req.user = authenticatedUser;
    next();
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
};
