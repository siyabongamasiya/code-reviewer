import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to database");
    client.release();
  } catch (error) {
    console.error("failed to connect to database", error);
    process.exit(1);
  }
};