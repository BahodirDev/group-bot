import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
let pool = null;
try {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} catch (error) {
  console.log("error=>", error);
}

export default pool;
