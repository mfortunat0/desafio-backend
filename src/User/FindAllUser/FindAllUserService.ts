import { IUserRepository } from "../../Repository/IUserRepository";
import { UserRepository } from "../../Repository/UserRepository";

export class FindAllUserService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute() {
    return await this.userRepository.findAll();
  }
}
