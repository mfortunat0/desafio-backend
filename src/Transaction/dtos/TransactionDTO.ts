import { UserDTO } from "../../User/dtos/UserDTO";
import { TranscationType } from "../enum/TransactionType";

export interface TransactionDTO {
  id?: string;
  userId: string;
  value: number;
  created_at: Date;
  type: TranscationType;
  user?: UserDTO;
}

export interface TransactionInsertDTO {
  id?: string;
  userId: string;
  value: number;
  created_at?: Date;
  type: TranscationType;
  user?: UserDTO;
}
