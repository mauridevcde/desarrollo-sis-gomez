import { createPool } from "mysql2/promise"; //conjunto de conexiones
import { DB_PORT, DB_NAME, DB_PASSWORD, DB_USER, DB_HOST } from "./config.js";
export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,
});
