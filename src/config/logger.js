import winston from "winston";
import { MongoDB } from "winston-mongodb";

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  level: "info",
});

const mongoTransport = new MongoDB({
  level: "error",
  db: process.env.MONGO_LOG_URI,
  collection: "server_logs",
  options: {
    useUnifiedTopology: true,
  },
  capped: true,
  tailable: true,
  silent: process.env.NODE_ENV === "test",
});

const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "ecom-api" },
  transports: [consoleTransport, mongoTransport],
  exitOnError: false,
});

export default logger;
