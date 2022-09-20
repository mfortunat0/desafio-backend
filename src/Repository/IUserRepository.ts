import { UserDTO } from "../User/UserDTO";

export interface IUserRepository {
  findOneById(id: string): Promise<UserDTO>;
  findAll(): Promise<UserDTO[]>;
  remove(id: string): Promise<void>;
  createUser({ name, email, birthday }: UserDTO): Promise<UserDTO>;
}
