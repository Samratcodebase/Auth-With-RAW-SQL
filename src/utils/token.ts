import jwt from "jsonwebtoken";
import { ENV } from "../utils/env.js";

type AcessTokenInputType = {
  id: Number;
  email: String;
};
const generateAcessToken = ({ id, email }: AcessTokenInputType) => {
  const secretKey = ENV.JWT_SECRET_KEY;
  const token = jwt.sign({ id, email }, secretKey, { expiresIn: "15m" });
  return token;
};

const generateRefreshToken = (userId: Number) => {
  const secretKey = ENV.JWT_SECRET_KEY;
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "15m" });
  return token;
};

export { generateAcessToken, generateRefreshToken };
