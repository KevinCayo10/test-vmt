import { DataSource } from "typeorm";

import * as Entities from "../../domain/entity";
import environment from "../../insfraestructure/persistence/loading-env";

export class DBConfig {
  public static dataSource: DataSource;

  static getConnection() {
    return this.dataSource;
  }

  static async initDB() {
    try {
      this.configConnection();
      if (!this.dataSource?.isInitialized) {
        await this.dataSource.initialize();
      }
      console.info("Database connected");
    } catch (error) {
      console.error(error);
      throw new Error("Error connecting to database");
    }
  }

  private static configConnection() {
    const { DB_NAME, DB_PASSWORD, DB_USER, DB_HOST, DB_PORT  } = environment;

    this.dataSource = new DataSource({
      type: "postgres",
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      synchronize: true,
      logging: false,
      entities: Entities,
      subscribers: [],
      migrations: [],
    });
  }
}
