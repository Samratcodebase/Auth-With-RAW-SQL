import type { Express, Router } from "express";
import { validateUser } from "../Middlewares/auth.middleware.js";
import { profile } from "../controllers/user.controller.js";
import express from "express";

const userRotuer = express.Router();

userRotuer.get("/v1/me", validateUser, profile);

export default userRotuer;
