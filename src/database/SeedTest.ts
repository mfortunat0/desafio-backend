import "dotenv/config";
import { PrismaClient, TranscationType } from "@prisma/client";
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

    // Create simple user
    const user = await prisma.user.create({
      data: {
        name: "foo",
        birthday: new Date("2000/11/06"),
        email: "foo@bar.com.br",
        password: "bar",
        openingBalance: await openingBalanceRepository.getValue(),
      },
    });
    console.log("User id: " + user.id);

    // Create samples transactions
    const actualDate = new Date();
    const tenDaysAgo = generateDateSeed(10);
    const twentyDaysAgo = generateDateSeed(20);
    const thirtyDaysAgo = generateDateSeed(30);
    const fortyDaysAgo = generateDateSeed(40);

    await prisma.transaction.createMany({
      data: [
        {
          //Actual
          value: 100,
          type: TranscationType.CREDITO,
          userId: user.id,
          created_at: actualDate,
        },
        {
          // 10 Days ago
          value: 100,
          type: TranscationType.DEBITO,
          userId: user.id,
          created_at: tenDaysAgo,
        },
        {
          // 20 Days ago
          value: 200,
          type: TranscationType.ESTORNO,
          userId: user.id,
          created_at: twentyDaysAgo,
        },
        {
          // 30 Days ago
          value: 3000,
          type: TranscationType.CREDITO,
          userId: user.id,
          created_at: thirtyDaysAgo,
        },
        {
          // 40 Days ago
          value: 400,
          type: TranscationType.CREDITO,
          userId: user.id,
          created_at: fortyDaysAgo,
        },
        {
          // 11/09/2001
          value: 1000,
          type: TranscationType.DEBITO,
          userId: user.id,
          created_at: new Date("2001/09/11"),
        },
      ],
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
