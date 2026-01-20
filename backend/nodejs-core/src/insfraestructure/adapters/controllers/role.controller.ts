import { Request, Response } from "express";
import ResponseController from "../../../shared/util/response.util";
import { RoleService } from "../../../application/services/role.service";

export class RoleController {
  constructor(private readonly service: RoleService) {}

  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      const result = await this.service.create(payload);
      ResponseController({ req, res, data: result, message: "Role created" });
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
        message: "Roles retrieved",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
