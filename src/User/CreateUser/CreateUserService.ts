import { IUserRepository } from "../../Repository/IUserRepository";
import { UserRepository } from "../../Repository/UserRepository";
import { UserDTO } from "../dtos/UserDTO";
import { hashSync } from "bcrypt";
import { IOpeningBalanceRepository } from "../../Repository/IOpeningBalanceRepository";
import { OpeningBalanceRepository } from "../../Repository/OpeningBalanceRepository";
import { AppError } from "../../Errors/AppError";

interface ICreateUserServiceProps {
  name: string;
  email: string;
  password: string;
  birthday: Date;
}

export class CreateUserService {
  private userRepository: IUserRepository;
  private openingBalanceRepository: IOpeningBalanceRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.openingBalanceRepository = new OpeningBalanceRepository();
  }

  async execute({
    name,
    email,
    password,
    birthday,
  }: ICreateUserServiceProps): Promise<UserDTO> {
    const diffYear = new Date().getFullYear() - birthday.getFullYear();
    const diffMonth = birthday.getMonth() - new Date().getMonth();
    const diffDay = birthday.getDate() - new Date().getDate();
    if (diffYear < 18) {
      throw new AppError("Underage user", 400);
    } else if (diffYear === 18 && diffMonth < 0) {
      throw new AppError("Underage user", 400);
    } else if (diffYear === 18 && diffMonth <= 0 && diffDay < 0) {
      throw new AppError("Underage user", 400);
    } else {
      return await this.userRepository.createUser({
        name,
        email,
        password: hashSync(password, 10),
        birthday,
        openingBalance: await this.openingBalanceRepository.getValue(),
      });
    }
  }
}
