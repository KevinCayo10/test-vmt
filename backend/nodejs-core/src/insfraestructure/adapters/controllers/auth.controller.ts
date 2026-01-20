import { Request, Response } from "express";
import ResponseController from "../../../shared/util/response.util";
import { AuthService } from "../../../application/services/auth.service";

export class AuthController {
  constructor(private readonly service: AuthService) {}

  async login(req: Request, res: Response) {
    try {
      const { identifier, password } = req.body;
      const result = await this.service.login(identifier, password);
      ResponseController({
        req,
        res,
        data: result,
        message: "Login successful",
      });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Error" });
    }
  }
}
