import { Request, Response } from "express";
import { LoginService } from "./LoginService";

export class LoginController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const loginService = new LoginService();
    const token = await loginService.execute(email, password);
    return response.json({ token });
  }
}
