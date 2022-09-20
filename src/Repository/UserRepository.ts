import { PrismaClient } from "@prisma/client";
import { AppError } from "../Errors/AppError";
import { UserDTO } from "../User/UserDTO";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  private client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
  }

  async findAll(): Promise<UserDTO[]> {
    return await this.client.user.findMany({
      orderBy: {
        id: "desc",
      },
    });
  }

  async findOneById(id: string): Promise<UserDTO> {
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

  async createUser({ name, email, birthday }: UserDTO): Promise<UserDTO> {
    const userAlreadyExists = await this.client.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists", 400);
    }

    const user: UserDTO = { name, email, birthday };
    return await this.client.user.create({
      data: user,
    });
  }

  async remove(id: string): Promise<void> {
    await this.client.user.delete({
      where: {
        id,
      },
    });
  }
}
