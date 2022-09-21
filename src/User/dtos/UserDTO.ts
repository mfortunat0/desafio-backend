import { TransactionDTO } from "../../Transaction/dtos/TransactionDTO";

export interface UserDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  admin?: boolean;
  birthday: Date;
  created_at?: Date;
  updated_at?: Date;
  transactions?: TransactionDTO[];
}
