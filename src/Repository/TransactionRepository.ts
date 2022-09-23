import { PrismaClient, TranscationType } from "@prisma/client";
import { prisma } from "../database/PrismaClient";
import { redis } from "../database/RedisClient";
import { AppError } from "../Errors/AppError";
import {
  TransactionDTO,
  TransactionInsertDTO,
} from "../Transaction/dtos/TransactionDTO";
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
  }: TransactionInsertDTO): Promise<TransactionDTO> {
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

  async findOneTransactionById(id: string): Promise<TransactionDTO | null> {
    return await this.client.transaction.findFirst({
      where: {
        id,
      },
    });
  }

  async findAllTransactionByUserId(id: string): Promise<TransactionDTO[]> {
    const transactionCache = await redis.get(`${id}-transactions`);

    if (transactionCache) {
      return JSON.parse(transactionCache);
    }
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

    redis.set(`${id}-transactions`, JSON.stringify(transactions), {
      EX: 60,
    });
    return transactions;
  }

  async findAllTransactionPaginationByUserId(
    id: string,
    skip: number,
    take: number
  ): Promise<TransactionDTO[]> {
    const transactions = await this.client.transaction.findMany({
      where: {
        userId: id,
      },
      take,
      skip,
      orderBy: {
        id: "desc",
      },
      include: {
        user: true,
      },
    });
    const transactionsWithOutUserPassword = transactions.map(
      (transactionOld) => {
        const { user, ...transaction } = transactionOld;
        const { password, ...userWithOutPassword } = user;
        return {
          ...transaction,
          user: userWithOutPassword,
        };
      }
    );
    return transactionsWithOutUserPassword;
  }

  async remove(id: string): Promise<void> {
    await this.client.transaction.delete({
      where: {
        id,
      },
    });
  }
}
