import { TransactionDTO } from "../../Transaction/dtos/TransactionDTO";

export interface UserDTO {
  id?: string;
  name: string;
  email: string;
  password?: string;
  openingBalance: number;
  admin: boolean;
  birthday: Date;
  created_at: Date;
  updated_at: Date;
  transactions?: TransactionDTO[];
}

export interface UserInsertDTO {
  name: string;
  email: string;
  password: string;
  openingBalance: number;
  birthday: Date;
}
