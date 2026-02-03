import { Transaction } from "../Entities/Transaction";

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  update(transaction: Transaction): Promise<Transaction>;
  findByOrderId(orderId: string): Promise<Transaction | null>;
  findByUserId(userId: string): Promise<Transaction[]>;
}
