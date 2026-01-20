import { Router } from "express";
import { MenuRoleImplement } from "../repository/menu_role.repository";
import { MenuRoleService } from "../../../application/services/menu-role.service";
import { MenuRoleController } from "../controllers/menu-role.controller";

const repo = new MenuRoleImplement();
const service = new MenuRoleService(repo);
const controller = new MenuRoleController(service);

export class MenuRoleRoutes {
  static readonly routes = Router();

  static getRoutes(): Router {
    this.routes.post("/", controller.create.bind(controller));
    this.routes.get("/", controller.findByRole.bind(controller));
    return this.routes;
  }
}
