import { Router } from "express";
import { ClientImplement } from "../repository/client.repository";
import { ClientService } from "../../../application/services/client.service";
import { ClientController } from "../controllers/client.controller";

const repo = new ClientImplement();
const service = new ClientService(repo);
const controller = new ClientController(service);

export class ClientRoutes {
  static readonly routes = Router();

  static getRoutes(): Router {
    this.routes.post("/", controller.create.bind(controller));
    this.routes.get("/", controller.findAll.bind(controller));
    return this.routes;
  }
}
