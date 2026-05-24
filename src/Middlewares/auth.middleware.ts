import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";
import { ENV } from "../utils/env.js";
import type { MyJwtPayload } from "../utils/token.js";

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

    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY) as MyJwtPayload;
    console.log("decoded.id", decoded.userId);

    req.userID = decoded.userId;
    next();
  } catch (error) {
    console.log("Error IN Validate Middleware", error);
  }
};
