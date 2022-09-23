import { AppError } from "../../Errors/AppError";
import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { IUserRepository } from "../../Repository/IUserRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";
import { UserRepository } from "../../Repository/UserRepository";

interface IDeleteUserServiceProps {
  id: string;
}

export class DeleteUserService {
  private userRepository: IUserRepository;
  private transactionRepository: ITransactionRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.transactionRepository = new TransactionRepository();
  }

  async execute({ id }: IDeleteUserServiceProps) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    const transactions =
      await this.transactionRepository.findAllTransactionByUserId(id);
    if (transactions.length > 0) {
      throw new AppError("User already has transactions", 400);
    }
    await this.userRepository.remove(id);
  }
}
