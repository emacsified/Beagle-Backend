import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const POSTGRES_URI = prod ? process.env["POSTGRES_URI"] : process.env["POSTGRES_URI_LOCAL"];

if (!SESSION_SECRET) {
  logger.error("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (!POSTGRES_URI) {
  if (prod) {
    logger.error("No postgres connection string. Set POSTGRES_URI environment variable.");
  } else {
    logger.error("No postgres connection string. Set POSTGRES_URI_LOCAL environment variable.");
  }
  process.exit(1);
}