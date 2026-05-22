import type { Response, Request } from "express";
import { generateAcessToken, generateRefreshToken } from "../utils/token.js";
import authService from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.register({ email, password });

  return res.status(201).json({
    message: "User Created Sucessfully",
    user: user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.login({ email, password });

  if (!user) {
    res.status(500).json({
      message: "Invaild Email Password",
    });
  }
  console.log(user?.id);

  await authService.setRefreshToken(
    Number(user?.id),
    generateRefreshToken(Number(user?.id)),
  );

  
  res.status(200).json({
    message: "Login Sucessfull",
    data: user,
  });
};
