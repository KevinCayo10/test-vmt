import { Router } from "express";
import { UserImplement } from "../repository/user.repository";
import { AuthService } from "../../../application/services/auth.service";
import { AuthController } from "../controllers/auth.controller";

const userRepo = new UserImplement();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

export class AuthRoutes {
  static readonly routes = Router();

  static getRoutes(): Router {
    this.routes.post("/login", authController.login.bind(authController));
    return this.routes;
  }
}
