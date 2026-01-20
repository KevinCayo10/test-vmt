import express, { Express } from "express";
import { MenuRoutes } from "./insfraestructure/adapters/routes/menu.routes";
import environment from "./insfraestructure/persistence/loading-env";
import { DBConfig } from "./shared/config/config-db";
import cors from "cors";
class Server {
  app: Express;
  port!: number;
  host!: string;

  constructor() {
    this.loadEnvs();
    this.app = express();
    this.loadMiddlewares();
    this.initializeRoutes();
  }

  async connectDB() {
    await DBConfig.initDB();
  }

  loadEnvs() {
    this.port = environment.PORT;
    this.host = environment.HOST;
  }

  private initializeRoutes() {
    const menuRoute = MenuRoutes.getRoutes();

    this.app.use("/menu", menuRoute);
  }

  private loadMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, this.host, () => {
      console.log(`App listening on Host ${this.host}  port ${this.port}`);
      this.connectDB();
    });
  }
}

const server = new Server();
server.listen();
