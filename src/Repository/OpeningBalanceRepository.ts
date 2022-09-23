import { PrismaClient } from "@prisma/client";
import { prisma } from "../database/PrismaClient";
import { IOpeningBalanceRepository } from "./IOpeningBalanceRepository";

export class OpeningBalanceRepository implements IOpeningBalanceRepository {
  private client: PrismaClient;
  constructor() {
    this.client = prisma;
  }

  async createValue(value: number): Promise<void> {
    await this.client.openingBalance.create({
      data: {
        value,
      },
    });
  }

  async updateValue(value: number): Promise<void> {
    await this.client.openingBalance.update({
      where: { id: 1 },
      data: { value },
    });
  }

  async getValue(): Promise<number> {
    const openingBalance = await this.client.openingBalance.findUnique({
      where: { id: 1 },
    });
    const value = openingBalance?.value || Number(process.env.OPENING_BALANCE);
    return value;
  }
}
