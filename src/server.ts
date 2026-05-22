import app from "./app.js";
import { pool } from "./DB/Db.js";
const main = async () => {
  try {
    const conn = await pool.getConnection();
    console.log("DB connected");
    conn.release();
    app.listen(3000, () => {
      console.log("Server is Running on Port 3000");
    });
  } catch (error) {
    console.log("Error Starting server:", error);
    process.exit(1);
  }
};

main();
