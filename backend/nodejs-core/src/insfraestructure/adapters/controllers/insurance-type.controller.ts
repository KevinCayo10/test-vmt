import { Request, Response } from "express";
import ResponseController from "../../../shared/util/response.util";
import { InsuranceTypeService } from "../../../application/services/insurance-type.service";

export class InsuranceTypeController {
  constructor(private readonly service: InsuranceTypeService) {}

  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      const result = await this.service.create(payload);
      ResponseController({
        req,
        res,
        data: result,
        message: "Insurance type created",
      });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Error" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.service.findAll();
      ResponseController({
        req,
        res,
        data: result,
        message: "Insurance types retrieved",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
