import { Router } from "express";
import { MenuImplement } from "../repository/menu.repository";
import { MenuService } from "../../../application/services/menu.service";
import { MenuController } from "../controllers/menu.controller";
import {
  createMenuSchema,
  updateMenuSchema,
  idParamSchema,
  validateBody,
  validateParams,
} from "../../validators/menu.validator";

const menuRepository = new MenuImplement();
const menuService = new MenuService(menuRepository);
const menuController = new MenuController(menuService);
export class MenuRoutes {
  static readonly routes = Router();

  static getRoutes(): Router {
    this.routes.get("/", menuController.findAll.bind(menuController));

    this.routes.post(
      "/",
      validateBody(createMenuSchema),
      menuController.create.bind(menuController),
    );

    this.routes.patch(
      "./:id".replace("./", "/"),
      validateParams(idParamSchema),
      validateBody(updateMenuSchema),
      menuController.update.bind(menuController),
    );

    this.routes.get(
      "./:id".replace("./", "/"),
      validateParams(idParamSchema),
      menuController.findById.bind(menuController),
    );

    this.routes.delete(
      "/:id",
      validateParams(idParamSchema),
      menuController.delete.bind(menuController),
    );

    return this.routes;
  }
}
