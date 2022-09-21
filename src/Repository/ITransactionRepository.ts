import { TransactionDTO } from "../Transaction/dtos/TransactionDTO";

export interface ITransactionRepository {
  createTransaction({
    type,
    value,
    userId,
  }: TransactionDTO): Promise<TransactionDTO>;
  findAllTransactionByUserId(id: string): Promise<TransactionDTO[]>;
  remove(id: string): Promise<void>;
}
