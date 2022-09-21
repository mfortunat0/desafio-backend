import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";
import { TransactionDTO } from "../dtos/TransactionDTO";

export class CreateReverseTransactionService {
  private transactionRepository: ITransactionRepository;
  constructor() {
    this.transactionRepository = new TransactionRepository();
  }
  async execute({ type, value, userId }: TransactionDTO) {
    const transaction = await this.transactionRepository.createTransaction({
      type,
      value,
      userId,
    });
    return transaction;
  }
}
