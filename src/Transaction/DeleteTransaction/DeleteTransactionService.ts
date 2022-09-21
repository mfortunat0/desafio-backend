import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";
import { TransactionDTO } from "../dtos/TransactionDTO";

export class DeleteTransactionService {
  private transactionRepository: ITransactionRepository;
  constructor() {
    this.transactionRepository = new TransactionRepository();
  }
  async execute(id: string) {
    await this.transactionRepository.remove(id);
  }
}
