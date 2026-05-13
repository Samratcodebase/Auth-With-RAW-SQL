import { pool } from "../DB/Db.js";
import type { RegisterInput } from "../types/auth.types.js";
export class AuthRepositories {
  async create({ email, password }: RegisterInput) {
    const [rows] = await pool.execute(
      "INSERT INTO user (email, password) VALUES (?, ?)",
      [email, password],
    );
    return rows;
  }
}
