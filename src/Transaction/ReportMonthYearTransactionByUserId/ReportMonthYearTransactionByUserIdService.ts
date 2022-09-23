import { TranscationType } from "@prisma/client";
import { AppError } from "../../Errors/AppError";
import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { IUserRepository } from "../../Repository/IUserRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";
import { UserRepository } from "../../Repository/UserRepository";
import { formatToCsv } from "../util/FormatTransactionToCsv";

interface IReportMonthYearTransactionByUserIdServiceProsp {
  id: string;
  month: number;
  year: number;
}

export class ReportMonthYearTransactionByUserIdService {
  private transactionRepository: ITransactionRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.userRepository = new UserRepository();
  }

  async execute({
    id,
    month,
    year,
  }: IReportMonthYearTransactionByUserIdServiceProsp) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    const data = await this.transactionRepository.findAllTransactionByUserId(
      id
    );

    let total = 0;
    const transactions = data.filter((transaction) => {
      const transactionMonth = transaction.created_at.getUTCMonth() + 1;
      const transactionYear = transaction.created_at.getFullYear();
      if (transactionMonth === month && transactionYear === year) {
        if (
          transaction.type === TranscationType.DEBITO ||
          transaction.type === TranscationType.ESTORNO
        ) {
          total += transaction.value;
        } else {
          total -= transaction.value;
        }
        return true;
      }
      return false;
    });

    total += user.openingBalance;
    return { csv: formatToCsv(transactions), total, user };
  }
}
