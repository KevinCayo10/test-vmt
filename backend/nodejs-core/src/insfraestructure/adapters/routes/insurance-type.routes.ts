import { Router } from "express";
import { InsuranceTypeImplement } from "../repository/insurance_type.repository";
import { InsuranceTypeService } from "../../../application/services/insurance-type.service";
import { InsuranceTypeController } from "../controllers/insurance-type.controller";

const repo = new InsuranceTypeImplement();
const service = new InsuranceTypeService(repo);
const controller = new InsuranceTypeController(service);

export class InsuranceTypeRoutes {
  static readonly routes = Router();

  static getRoutes(): Router {
    this.routes.post("/", controller.create.bind(controller));
    this.routes.get("/", controller.findAll.bind(controller));
    return this.routes;
  }
}
