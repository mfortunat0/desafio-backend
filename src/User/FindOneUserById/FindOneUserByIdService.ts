import { IUserRepository } from "../../Repository/IUserRepository";
import { UserRepository } from "../../Repository/UserRepository";

export class FindOneUserByIdService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(id: string) {
    return await this.userRepository.findOneById(id);
  }
}
