import { TranscationType } from "@prisma/client";
import { AppError } from "../../Errors/AppError";
import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { IUserRepository } from "../../Repository/IUserRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";
import { UserRepository } from "../../Repository/UserRepository";
import { formatToCsv } from "../util/FormatTransactionToCsv";

interface IReportAllTransactionByUserIdServiceProps {
  id: string;
}

export class ReportAllTransactionByUserIdService {
  private transactionRepository: ITransactionRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.userRepository = new UserRepository();
  }

  async execute({ id }: IReportAllTransactionByUserIdServiceProps) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    const transactions =
      await this.transactionRepository.findAllTransactionByUserId(id);

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

    return { csv: formatToCsv(transactions), total, user };
  }
}
