import { ENV } from "./utils/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser(ENV.COOKIE_PARSER_SECRECT));
app.use("/auth", authRouter);
export default app;
