import type { Express, Router } from "express";
import { validateUser } from "../Middlewares/auth.middleware.js";
import express from "express";

const userRotuer = express.Router();

userRotuer.get("/v1/me", validateUser, (req, res) => {
  console.log("Hello from Mee");
});

export default userRotuer;
