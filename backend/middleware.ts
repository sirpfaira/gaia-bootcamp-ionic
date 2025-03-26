import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "./models";

export interface CustomRequest extends Request {
  user?: IUser;
  token?: string;
}

interface DecodedToken {
  _id: string;
}

export const authenticate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Authentication failed. Token missing.");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as DecodedToken;
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Authentication failed. User not found.");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed." });
  }
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}

// Middleware to check if user is admin
export const authorize = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === UserRole.Admin) {
    return next(); // User is admin, allow access
  } else {
    res.status(403).json({ message: "Unauthorized" }); // User is not admin, deny access
  }
};
