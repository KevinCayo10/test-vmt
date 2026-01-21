import { Router } from "express";
import { ClientInsuranceImplement } from "../repository/client_insurance.repository";
import { ClientInsuranceService } from "../../../application/services/client-insurance.service";
import { ClientInsuranceController } from "../controllers/client-insurance.controller";

const repo = new ClientInsuranceImplement();
const service = new ClientInsuranceService(repo);
const controller = new ClientInsuranceController(service);

export class ClientInsuranceRoutes {
  static readonly routes = Router();

  static getRoutes(): Router {
    this.routes.get(
      "/:clientId/insurances",
      controller.listByClient.bind(controller),
    );
    this.routes.post(
      "/:clientId/insurances",
      controller.assign.bind(controller),
    );
    this.routes.put(
      "/:clientId/insurances/:insuranceId/cancel",
      controller.cancel.bind(controller),
    );
    this.routes.put(
      "/:clientId/insurances/:insuranceId/reactivate",
      controller.reactivate.bind(controller),
    );
    return this.routes;
  }
}
