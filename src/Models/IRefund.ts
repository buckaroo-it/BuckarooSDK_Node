import { ITransactionData } from "./TransactionData";

export interface IRefund extends ITransactionData {
  order?:string
  invoice:string
  amountCredit: number
  originalTransactionKey:string

}