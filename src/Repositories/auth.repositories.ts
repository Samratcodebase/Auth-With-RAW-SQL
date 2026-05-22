import { pool } from "../DB/Db.js";
import type {  ResultSetHeader } from "mysql2/promise";
import type { RegisterInput, LoginInput } from "../types/auth.types.js";
import type { User } from "../types/db.types.js";
export class AuthRepositories {
  async create({ email, password }: RegisterInput) {
    const [rows] = await pool.execute<ResultSetHeader>(
      "INSERT INTO user (email, password) VALUES (?, ?)",
      [email, password],
    );
    return rows;
  }

  async login({ email, password }: LoginInput) {
    const [rows] = await pool.execute<User[]>(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, password],
    );

    return rows;
  }

  setRefreshToken = async (id: number, token: string) => {
    const [rows] = await pool.execute<ResultSetHeader>(
      "UPDATE user SET refresh_token = ? WHERE id=? ",
      [token, id],
    );
    return rows;
  };
}

export const Auth = new AuthRepositories();
