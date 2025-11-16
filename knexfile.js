// knexfile.js (ES Module va faqat 'development' uchun)

import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(__dirname, "src/db/migrations"),
    },
    // Seeds sozlamasini kelajak uchun qoldiramiz
    seeds: {
      directory: path.join(__dirname, "src/db/seeds"),
    },
  },
};

export default config;
