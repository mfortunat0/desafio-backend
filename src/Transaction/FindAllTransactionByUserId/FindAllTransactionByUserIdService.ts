import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";

export class FindAllTransactionByUserIdService {
  private transactionRepository: ITransactionRepository;
  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async execute(id: string) {
    const transactions =
      await this.transactionRepository.findAllTransactionByUserId(id);
    return transactions;
  }
}
