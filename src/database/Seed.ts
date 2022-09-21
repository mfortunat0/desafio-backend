import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.create({
      data: {
        name: "admin",
        birthday: new Date("09/04/1998"),
        email: process.env.ADMIN_EMAIL + "",
        password: process.env.ADMIN_PASSWORD + "",
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
