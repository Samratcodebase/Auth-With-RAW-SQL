import { pool } from "../DB/Db.js";
import type { ResultSetHeader } from "mysql2/promise";
import type { RegisterInput, LoginInput } from "../types/auth.js";
import type { User } from "../types/token.js";
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
  getRefreshToken = async (id: number) => {
    const [rows] = await pool.execute<User[]>(
      "SELECT refresh_token FROM user WHERE id = ?",
      [id],
    );

    return rows[0];
  };
}

export const Auth = new AuthRepositories();
