import { AppError } from "../../Errors/AppError";
import { IUserRepository } from "../../Repository/IUserRepository";
import { UserRepository } from "../../Repository/UserRepository";
import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

export class LoginService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(email: string, password: string) {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    if (!compareSync(password, user.password)) {
      throw new AppError("Email or password is invalid", 400);
    }

    return sign({}, process.env.SECRET + "", {
      subject: user.id,
      expiresIn: "1d",
    });
  }
}
