import { Request, Response } from "express";
import { AppError } from "../../Errors/AppError";
import { LoginService } from "./LoginService";

export class LoginController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (email.length < 1 || password.length < 1) {
      throw new AppError("Fields not filled in correctly", 400);
    }

    const loginService = new LoginService();
    const token = await loginService.execute({ email, password });
    return response.json({ token });
  }
}
