import { TranscationType } from "@prisma/client";
import { AppError } from "../../Errors/AppError";
import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { IUserRepository } from "../../Repository/IUserRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";
import { UserRepository } from "../../Repository/UserRepository";
import { TransactionDTO } from "../dtos/TransactionDTO";

interface ICreateDebitTransactionServiceProps {
  type: TranscationType;
  value: number;
  userId: string;
}

export class CreateDebitTransactionService {
  private transactionRepository: ITransactionRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.userRepository = new UserRepository();
  }

  async execute({ type, value, userId }: ICreateDebitTransactionServiceProps) {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    const transaction = await this.transactionRepository.createTransaction({
      type,
      value,
      userId,
    });
    return transaction;
  }
}
