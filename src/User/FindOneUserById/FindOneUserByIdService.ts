import { AppError } from "../../Errors/AppError";
import { IUserRepository } from "../../Repository/IUserRepository";
import { UserRepository } from "../../Repository/UserRepository";

interface IFindOneUserByIdServiceProps {
  id: string;
}

export class FindOneUserByIdService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute({ id }: IFindOneUserByIdServiceProps) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    return user;
  }
}
