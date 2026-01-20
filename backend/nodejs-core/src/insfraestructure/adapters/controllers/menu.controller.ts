import { MenuService } from "application/services/menu.service";
import { MenuI } from "../../../domain/interfaces/menu.interface";
import ResponseController from "../../../shared/util/response.util";
import { Request, Response } from "express";

export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  async create(req: Request, res: Response) {
    try {
      const menu = req.body as MenuI;
      console.log("Menu to create:", menu);
      const result = await this.menuService.create(menu);
      ResponseController({
        req,
        res,
        data: result,
        message: "Menu created successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.menuService.findAll();
      ResponseController({
        req,
        res,
        data: result,
        message: "Menus retrieved successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await this.menuService.findById(id);
      ResponseController({
        req,
        res,
        data: result,
        message: "Menu retrieved successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const menu = req.body as MenuI;
      const result = await this.menuService.update(id, menu);
      ResponseController({
        req,
        res,
        data: result,
        message: "Menu updated successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params?.id);
      const result = await this.menuService.delete(id);
      ResponseController({
        req,
        res,
        data: result,
        message: "Menu deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
