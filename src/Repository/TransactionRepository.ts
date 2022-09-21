import { PrismaClient, TranscationType } from "@prisma/client";
import { prisma } from "../database/PrismaClient";
import { AppError } from "../Errors/AppError";
import { TransactionDTO } from "../Transaction/dtos/TransactionDTO";
import { ITransactionRepository } from "./ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {
  private client: PrismaClient;
  constructor() {
    this.client = prisma;
  }

  async createTransaction({
    type,
    value,
    userId,
  }: TransactionDTO): Promise<TransactionDTO> {
    const user = await this.client.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    const transaction = await this.client.transaction.create({
      data: {
        type,
        value: Number(value),
        userId: user.id,
      },
    });
    return transaction;
  }

  async findAllTransactionByUserId(id: string): Promise<TransactionDTO[]> {
    const transactions = await this.client.transaction.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        id: "desc",
      },
      include: {
        user: true,
      },
    });
    return transactions;
  }

  async remove(id: string): Promise<void> {
    await this.client.transaction.delete({
      where: {
        id,
      },
    });
  }
}
