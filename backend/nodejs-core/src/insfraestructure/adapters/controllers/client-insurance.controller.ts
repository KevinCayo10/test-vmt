import { Request, Response } from "express";
import ResponseController from "../../../shared/util/response.util";
import { ClientInsuranceService } from "../../../application/services/client-insurance.service";

export class ClientInsuranceController {
  constructor(private readonly service: ClientInsuranceService) {}

  async assign(req: Request, res: Response) {
    try {
      const clientId = Number(req.params.clientId);
      const { insuranceTypeId } = req.body;
      const result = await this.service.assign(
        clientId,
        Number(insuranceTypeId),
      );
      ResponseController({
        req,
        res,
        data: result,
        message: "Insurance assigned",
      });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Error" });
    }
  }

  async cancel(req: Request, res: Response) {
    try {
      const clientId = Number(req.params.clientId);
      const insuranceId = Number(req.params.insuranceId);
      const result = await this.service.cancel(clientId, insuranceId);
      ResponseController({
        req,
        res,
        data: result,
        message: "Insurance cancelled",
      });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Error" });
    }
  }

  async reactivate(req: Request, res: Response) {
    try {
      const clientId = Number(req.params.clientId);
      const insuranceId = Number(req.params.insuranceId);
      const result = await this.service.reactivate(clientId, insuranceId);
      ResponseController({
        req,
        res,
        data: result,
        message: "Insurance reactivated",
      });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Error" });
    }
  }
}
