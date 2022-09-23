import { UserDTO, UserInsertDTO } from "../User/dtos/UserDTO";

export interface IUserRepository {
  findOneById(id: string): Promise<UserDTO>;
  findOneByEmail(email: string): Promise<UserDTO | null>;
  findAll(): Promise<UserDTO[]>;
  remove(id: string): Promise<void>;
  createUser({ name, email, birthday }: UserInsertDTO): Promise<UserDTO>;
}
