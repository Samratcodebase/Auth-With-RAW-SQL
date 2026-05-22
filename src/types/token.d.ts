import mysql from "mysql2/promise";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export interface User extends RowDataPacket {
  id: number;
  userName: string;
  email: string;
  password: string;
  refresh_token: string;
  isVerifed: string;
  verification_token: string;
  password_reset_token: string;
  password_reset_token_expire: string;
  profile_url: string;
}
