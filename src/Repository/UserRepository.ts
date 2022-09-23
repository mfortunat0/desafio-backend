import { PrismaClient } from "@prisma/client";
import { prisma } from "../database/PrismaClient";
import { redis } from "../database/RedisClient";
import { AppError } from "../Errors/AppError";
import { UserDTO, UserInsertDTO } from "../User/dtos/UserDTO";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  private client: PrismaClient;
  constructor() {
    this.client = prisma;
  }

  async findAll(): Promise<UserDTO[]> {
    const usersCache = await redis.get("allUsers");

    if (usersCache) {
      return JSON.parse(usersCache);
    }

    const users = await this.client.user.findMany({
      orderBy: {
        id: "desc",
      },
    });
    const usersWithOutPassword = users.map((user) => {
      const { password, ...userWithOutPassowrd } = user;
      return userWithOutPassowrd;
    });

    redis.set("allUsers", JSON.stringify(usersWithOutPassword), {
      EX: 60,
    });
    return usersWithOutPassword;
  }

  async findOneByEmail(email: string): Promise<UserDTO | null> {
    return await this.client.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findOneById(id: string): Promise<UserDTO> {
    if (!id) {
      throw new AppError("User not exists", 400);
    }
    const user = await this.client.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    return user;
  }

  async createUser({
    name,
    email,
    password,
    birthday,
    openingBalance,
  }: UserInsertDTO): Promise<UserDTO> {
    const userAlreadyExists = await this.client.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists", 400);
    }

    const user: UserInsertDTO = {
      name,
      email,
      password,
      birthday,
      openingBalance,
    };
    const newUser = await this.client.user.create({
      data: user,
    });
    const { password: hidePassword, ...newUserWithOutPassword } = newUser;
    return newUserWithOutPassword;
  }

  async remove(id: string): Promise<void> {
    await this.client.user.delete({
      where: {
        id,
      },
    });
  }
}
