import { Request, Response } from "express";
import ResponseController from "../../../shared/util/response.util";
import { MenuRoleService } from "../../../application/services/menu-role.service";

export class MenuRoleController {
  constructor(private readonly service: MenuRoleService) {}

  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      const result = await this.service.create(payload);
      ResponseController({
        req,
        res,
        data: result,
        message: "Menu created for role",
      });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Error" });
    }
  }

  async findByRole(req: Request, res: Response) {
    try {
      const roleId = Number((req as any).auth?.roleId ?? req.query.roleId);
      if (!roleId) return res.status(400).json({ message: "roleId required" });
      const result = await this.service.findByRole(roleId);
      ResponseController({
        req,
        res,
        data: result,
        message: "Menus retrieved",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
