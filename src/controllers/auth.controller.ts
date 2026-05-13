import type { Response, Request } from "express";
import authService from "../services/auth.service.js";
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.register({ email, password });

  return res.status(201).json({
    message: "User Created Sucessfully",
    user: user,
  });
};
