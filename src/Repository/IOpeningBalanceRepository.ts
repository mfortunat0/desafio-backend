export interface IOpeningBalanceRepository {
  createValue(value: number): Promise<void>;
  updateValue(value: number): Promise<void>;
  getValue(): Promise<number>;
}
