import { Sequelize } from "sequelize";

require("dotenv").config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "postgres",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  }
);
