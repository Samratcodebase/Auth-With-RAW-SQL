import mysql from "mysql2/promise";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export interface User extends RowDataPacket {
  id: Number;
  userName: String;
  email: String;
  password: String;
  refresh_token: String;
  isVerifed: String;
  verification_token: String;
  password_reset_token: String;
  password_reset_token_expire: String;
  profile_url: String;
}
