import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const config = {
  development: {
    Client: "pg",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(__dirName, "src/db/migrations"),
    },
    seeds: {
      directory: path.join(__dirName, "src/db/seeds"),
    },
  },

  production: {
    Client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(__dirname, "src/db/migrations"),
    },
    seeds: {
      directory: path.join(__dirName, "src/db/seeds"),
    },
  },
};

export default config;
