import { Request, Response } from "express";
import ResponseController from "../../../shared/util/response.util";
import { ClientService } from "../../../application/services/client.service";

export class ClientController {
  constructor(private readonly service: ClientService) {}

  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      const result = await this.service.create(payload);
      ResponseController({ req, res, data: result, message: "Client created" });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Error" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const filters = req.query;
      const result = await this.service.findAll(filters);
      ResponseController({
        req,
        res,
        data: result,
        message: "Clients retrieved",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
