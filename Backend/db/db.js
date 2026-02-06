import "dotenv/config";

import pkg from "pg";
const { Pool } = pkg;

const DATABASE_URL = process.env.DATABASE_URL;

console.log(DATABASE_URL);
export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Connected to Supabase Postgres");
    
  } catch (err) {
    console.error("Supabase DB connection error", err);
    
  }
})();
