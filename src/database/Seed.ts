import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { OpeningBalanceRepository } from "../Repository/OpeningBalanceRepository";

const prisma = new PrismaClient();
const openingBalanceRepository = new OpeningBalanceRepository();

const load = async () => {
  try {
    // Insert default value into OpeneningBalance
    await openingBalanceRepository.createValue(
      Number(process.env.OPENING_BALANCE)
    );

    // Create Admin User
    await prisma.user.create({
      data: {
        name: process.env.ADMIN_NAME + "",
        birthday: new Date(process.env.ADMIN_BIRTHDAY + ""),
        email: process.env.ADMIN_EMAIL + "",
        password: process.env.ADMIN_PASSWORD + "",
        openingBalance: await openingBalanceRepository.getValue(),
        admin: true,
      },
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
load();

function generateDateSeed(daysDelay: number) {
  const actualDate = new Date();
  actualDate.setDate(actualDate.getDate() - daysDelay);
  return actualDate;
}
