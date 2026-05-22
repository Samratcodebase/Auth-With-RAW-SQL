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

  const RefreshToken = generateRefreshToken(Number(user?.id));
  const AcessToken = generateAcessToken(Number(user?.id), user?.email!);
  await authService.setRefreshToken(Number(user?.id), RefreshToken);
  res.cookie("acessToken", AcessToken, {
    signed: true, //Create Signed Cookie / and Detect Tempering
    httpOnly: true, // Prevents JavaScript access
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({
    message: "Login Sucessfull",
    data: user,
  });
};
