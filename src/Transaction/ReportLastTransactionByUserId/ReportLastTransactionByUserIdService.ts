import { TranscationType } from "@prisma/client";
import { AppError } from "../../Errors/AppError";
import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { IUserRepository } from "../../Repository/IUserRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";
import { UserRepository } from "../../Repository/UserRepository";
import { TransactionDTO } from "../dtos/TransactionDTO";
import { formatToCsv } from "../util/FormatTransactionToCsv";

interface IReportLastTransactionByUserIdServiceProps {
  id: string;
}

export class ReportLastTransactionByUserIdService {
  private transactionRepository: ITransactionRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.userRepository = new UserRepository();
  }

  async execute({ id }: IReportLastTransactionByUserIdServiceProps) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    const data = await this.transactionRepository.findAllTransactionByUserId(
      id
    );

    const date = new Date();
    let total = 0;
    const transactions: TransactionDTO[] = [];
    for (let transaction of data) {
      const diffMs = date.getTime() - transaction.created_at.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays > -1 && diffDays < 31) {
        transactions.push(transaction);
        if (
          transaction.type === TranscationType.DEBITO ||
          transaction.type === TranscationType.ESTORNO
        ) {
          total += transaction.value;
        } else {
          total -= transaction.value;
        }
      }
    }
    total += user.openingBalance;
    return { csv: formatToCsv(transactions), total, user };
  }
}
