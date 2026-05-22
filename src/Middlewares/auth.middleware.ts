import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { ENV } from "../utils/env.js";

interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
}

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.signedCookies.acessToken;

    if (!token) {
      res.status(401).json({
        message: "Unauthorized Access No Token ",
      });
    }

    const decoded: TokenPayload = jwt.verify(
      token,
      ENV.JWT_SECRET_KEY,
    ) as TokenPayload;

    req.userID = decoded.id;
    next();
  } catch (error) {
    console.log("Error IN Validate Middleware", error);
  }
};
