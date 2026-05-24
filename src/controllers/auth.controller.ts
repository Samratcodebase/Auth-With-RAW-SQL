import type { Response, Request } from "express";
import {
  generateAcessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";
import type { MyJwtPayload } from "../utils/token.js";
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

  const RefreshToken = generateRefreshToken(Number(user?.id), user?.email!);
  const AcessToken = generateAcessToken(Number(user?.id), user?.email!);
  await authService.setRefreshToken(Number(user?.id), RefreshToken);
  res.cookie("acessToken", AcessToken, {
    signed: true, //Create Signed Cookie / and Detect Tempering
    httpOnly: true, // Prevents JavaScript access
    secure: true,
    sameSite: "strict",
  });
  res.cookie("refreshToken", RefreshToken, {
    signed: true,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/auth/v1/refresh", // IMPORTANT
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "Login Sucessfull",
    data: user,
  });
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const User_refresh_token = req.signedCookies.refreshToken;
    const decode = verifyRefreshToken(User_refresh_token) as MyJwtPayload;

    const DB_Token = await authService.getRefreshToken(decode.userId);

    if (DB_Token?.refresh_token !== User_refresh_token) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const RefreshToken = generateRefreshToken(
      Number(decode.userId),
      decode.email,
    );
    const AcessToken = generateAcessToken(
      Number(decode.userId),
      decode?.email!,
    );
    await authService.setRefreshToken(Number(decode.userId), RefreshToken);
    res.cookie("acessToken", AcessToken, {
      signed: true, //Create Signed Cookie / and Detect Tempering
      httpOnly: true, // Prevents JavaScript access
      secure: true,
      sameSite: "strict",
    });
    res.cookie("refreshToken", RefreshToken, {
      signed: true,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/auth/v1/refresh", // IMPORTANT
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Tokens refreshed successfully",
    });
  } catch (error: any) {
    console.log("Error Happend", error.message);
  }
};
