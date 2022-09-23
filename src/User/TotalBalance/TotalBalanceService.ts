import { TranscationType } from "@prisma/client";
import { AppError } from "../../Errors/AppError";
import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { IUserRepository } from "../../Repository/IUserRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";
import { UserRepository } from "../../Repository/UserRepository";

interface ITotalBalanceServiceProps {
  id: string;
}

export class TotalBalanceService {
  private transactionsRepository: ITransactionRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.transactionsRepository = new TransactionRepository();
    this.userRepository = new UserRepository();
  }

  async execute({ id }: ITotalBalanceServiceProps) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    const transactions =
      await this.transactionsRepository.findAllTransactionByUserId(id);
    let total = 0;
    transactions.forEach((transaction) => {
      if (
        transaction.type === TranscationType.DEBITO ||
        transaction.type === TranscationType.ESTORNO
      ) {
        total += transaction.value;
      } else {
        total -= transaction.value;
      }
    });
    total += user.openingBalance;
    return total;
  }
}
