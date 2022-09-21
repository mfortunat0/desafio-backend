import { ITransactionRepository } from "../../Repository/ITransactionRepository";
import { TransactionRepository } from "../../Repository/TransactionRepository";
import { TransactionDTO } from "../dtos/TransactionDTO";

export class ReportAllTransactionByUserIdService {
  private transactionRepository: ITransactionRepository;
  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async execute(id: string) {
    const transactions =
      await this.transactionRepository.findAllTransactionByUserId(id);
    return this.formatToCsv(transactions);
  }

  private formatToCsv(stream: TransactionDTO[]) {
    let csv = "id,userId,value,type\n";
    stream.forEach((obj, index) => {
      csv += `${obj.id},${obj.userId},${obj.value},${obj.type}\n`;
    });
    return csv;
  }
}
