import app from "./app";
import { pool } from "./app/config/db";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await pool.query("SELECT NOW()");

    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();