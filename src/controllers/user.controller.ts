import type { Request, Response } from "express";
import userService from "../services/user.service.js";
export const profile = async (req: Request, res: Response) => {
  const userID = req.userID;

  const user = await userService.profile(userID!);
  res.status(200).json({
    message: "Fetch sUCESS full",
    data: user,
  });
};
