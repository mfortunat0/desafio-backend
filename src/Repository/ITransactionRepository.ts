import {
  TransactionDTO,
  TransactionInsertDTO,
} from "../Transaction/dtos/TransactionDTO";

export interface ITransactionRepository {
  createTransaction({
    type,
    value,
    userId,
  }: TransactionInsertDTO): Promise<TransactionDTO>;
  findAllTransactionByUserId(id: string): Promise<TransactionDTO[]>;
  findAllTransactionPaginationByUserId(
    id: string,
    skip: number,
    take: number
  ): Promise<TransactionDTO[]>;
  findOneTransactionById(id: string): Promise<TransactionDTO | null>;
  remove(id: string): Promise<void>;
}
