import { UserDTO } from "../../User/dtos/UserDTO";
import { TranscationType } from "../enum/TransactionType";

export interface TransactionDTO {
  id?: string;
  userId?: string;
  value: number;
  type: TranscationType;
  user?: UserDTO;
}
