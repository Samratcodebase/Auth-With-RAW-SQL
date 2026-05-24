import type { Express, Router } from "express";
import express from "express";
import { login, register, refresh } from "../controllers/auth.controller.js";
const authRouter: Router = express.Router();

authRouter.post("/v1/register", register);
authRouter.post("/v1/login", login);
authRouter.get("/v1/refresh", refresh);
export default authRouter;
