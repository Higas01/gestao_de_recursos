import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); 

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ["src/utils/database/migrations/*.ts"],
  synchronize: false, 
});
