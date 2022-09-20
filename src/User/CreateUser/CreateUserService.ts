import { IUserRepository } from "../../Repository/IUserRepository";
import { UserRepository } from "../../Repository/UserRepository";
import { UserDTO } from "../UserDTO";

export class CreateUserService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute({ name, email, birthday }: UserDTO): Promise<UserDTO> {
    return await this.userRepository.createUser({ name, email, birthday });
  }
}
