import { ITransactionRepository } from "../../../Domain/Repositories/ITransactionRepository";
import { Transaction } from "../../../Domain/Entities/Transaction";

export class GetTransactionHistory {
  constructor(private transactionRepo: ITransactionRepository) {}

  async execute(userId: string): Promise<Transaction[]> {
    return this.transactionRepo.findByUserId(userId);
  }
}
