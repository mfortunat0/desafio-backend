import { IOpeningBalanceRepository } from "../../Repository/IOpeningBalanceRepository";
import { OpeningBalanceRepository } from "../../Repository/OpeningBalanceRepository";

interface IUpdateOpeningBalanceServiceProps {
  value: number;
}

export class UpdateOpeningBalanceService {
  private openingBalanceRepository: IOpeningBalanceRepository;
  constructor() {
    this.openingBalanceRepository = new OpeningBalanceRepository();
  }

  async execute({ value }: IUpdateOpeningBalanceServiceProps) {
    await this.openingBalanceRepository.updateValue(value);
  }
}
