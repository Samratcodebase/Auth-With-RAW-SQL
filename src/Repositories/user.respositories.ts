import { pool } from "../DB/Db.js";

const getProfile = async (id: number) => {
  const [rows] = await pool.execute(" SELECT * FROM user WHERE id = ?", [id]);

  return rows;
};

export default { getProfile };
