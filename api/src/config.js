import { config } from "dotenv";

import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});

config();

export const pg = {
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
};
export const jwtSecret = process.env.JWT_SECRET;
export const services = {
    serviceA: {
        address: process.env.SERVICE_A_ADDRESS,
    },
    serviceB: {
        address: process.env.SERVICE_B_ADDRESS,
    },
    serviceC: {
        address: process.env.SERVICE_C_ADDRESS,
    },
};
export const db = pool;
