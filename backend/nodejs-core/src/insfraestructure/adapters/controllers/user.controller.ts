import { Request, Response } from "express";
import ResponseController from "../../../shared/util/response.util";
import { UserService } from "../../../application/services/user.service";

export class UserController {
  constructor(private readonly service: UserService) {}

  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      const result = await this.service.create(payload);
      ResponseController({ req, res, data: result, message: "User created" });
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
        message: "Users retrieved",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const payload = req.body;
      const result = await this.service.update(id, payload);
      ResponseController({ req, res, data: result, message: "User updated" });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Error" });
    }
  }
}
