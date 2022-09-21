import { IUserRepository } from "../../Repository/IUserRepository";
import { UserRepository } from "../../Repository/UserRepository";
import { UserDTO } from "../dtos/UserDTO";
import { hashSync } from "bcrypt";

export class CreateUserService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute({
    name,
    email,
    password,
    birthday,
  }: UserDTO): Promise<UserDTO> {
    return await this.userRepository.createUser({
      name,
      email,
      password: hashSync(password, 10),
      birthday,
    });
  }
}
