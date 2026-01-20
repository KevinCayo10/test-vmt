import { Router } from "express";
import { UserImplement } from "../repository/user.repository";
import { UserService } from "../../../application/services/user.service";
import { UserController } from "../controllers/user.controller";

const repo = new UserImplement();
const service = new UserService(repo);
const controller = new UserController(service);

export class UserRoutes {
  static readonly routes = Router();

  static getRoutes(): Router {
    this.routes.post("/", controller.create.bind(controller));
    this.routes.get("/", controller.findAll.bind(controller));
    this.routes.put("/:id", controller.update.bind(controller));
    return this.routes;
  }
}
