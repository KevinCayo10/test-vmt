import express, { Express } from "express";
import { MenuRoutes } from "./insfraestructure/adapters/routes/menu.routes";
import { AuthRoutes } from "./insfraestructure/adapters/routes/auth.routes";
import { UserRoutes } from "./insfraestructure/adapters/routes/user.routes";
import { RoleRoutes } from "./insfraestructure/adapters/routes/role.routes";
import { MenuRoleRoutes } from "./insfraestructure/adapters/routes/menu-role.routes";
import { ClientRoutes } from "./insfraestructure/adapters/routes/client.routes";
import { InsuranceTypeRoutes } from "./insfraestructure/adapters/routes/insurance-type.routes";
import { ClientInsuranceRoutes } from "./insfraestructure/adapters/routes/client-insurance.routes";
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
    const authRoute = AuthRoutes.getRoutes();
    const userRoute = UserRoutes.getRoutes();
    const roleRoute = RoleRoutes.getRoutes();
    const menusByRoleRoute = MenuRoleRoutes.getRoutes();
    const clientRoute = ClientRoutes.getRoutes();
    const insuranceTypeRoute = InsuranceTypeRoutes.getRoutes();
    const clientInsuranceRoute = ClientInsuranceRoutes.getRoutes();

    this.app.use("/menu", menuRoute);
    this.app.use("/auth", authRoute);
    this.app.use("/users", userRoute);
    this.app.use("/roles", roleRoute);
    this.app.use("/menus", menusByRoleRoute);
    this.app.use("/clients", clientRoute);
    this.app.use("/insurance-types", insuranceTypeRoute);
    this.app.use("/clients", clientInsuranceRoute);
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
