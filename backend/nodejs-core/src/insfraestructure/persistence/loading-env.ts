import * as dotenv from "dotenv";
import { cleanEnv, host, port, str } from "envalid";

dotenv.config();

const environment = cleanEnv(process.env, {
  // App
  HOST: host(),
  PORT: port(),
  PASSWORD_SECRET: str(),

  // Database
  DB_HOST: host(),
  DB_PORT: port(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),
});

export default environment;
