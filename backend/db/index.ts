import { createPool } from "mysql";

// create database pool using mySQL
const db = createPool({
  host: process.env.SERVER,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: Number(process.env.DATABASE_PORT),
});

export default db;
