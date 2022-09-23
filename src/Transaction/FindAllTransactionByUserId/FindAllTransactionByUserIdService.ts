import { AppError } from "../../Errors/AppError";
import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { IUserRepository } from "../../Repository/IUserRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";
import { UserRepository } from "../../Repository/UserRepository";

interface IFindAllTransactionByUserIdServiceProps {
  id: string;
  skip: number;
  take: number;
}

export class FindAllTransactionByUserIdService {
  private transactionRepository: ITransactionRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.userRepository = new UserRepository();
  }

  async execute({ id, skip, take }: IFindAllTransactionByUserIdServiceProps) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    const transactions =
      await this.transactionRepository.findAllTransactionPaginationByUserId(
        id,
        skip,
        take
      );
    return transactions;
  }
}
