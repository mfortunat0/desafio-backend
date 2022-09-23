import { AppError } from "../../Errors/AppError";
import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";

interface IDeleteTransactionServiceProps {
  id: string;
}

export class DeleteTransactionService {
  private transactionRepository: ITransactionRepository;
  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async execute({ id }: IDeleteTransactionServiceProps) {
    const transaction = await this.transactionRepository.findOneTransactionById(
      id
    );

    if (!transaction) {
      throw new AppError("Transaction not exists", 400);
    }

    await this.transactionRepository.remove(id);
  }
}
