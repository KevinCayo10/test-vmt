import { Router } from "express";
import { RoleImplement } from "../repository/role.repository";
import { RoleService } from "../../../application/services/role.service";
import { RoleController } from "../controllers/role.controller";

const repo = new RoleImplement();
const service = new RoleService(repo);
const controller = new RoleController(service);

export class RoleRoutes {
  static readonly routes = Router();

  static getRoutes(): Router {
    this.routes.post("/", controller.create.bind(controller));
    this.routes.get("/", controller.findAll.bind(controller));
    return this.routes;
  }
}
