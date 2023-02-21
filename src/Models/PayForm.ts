import { uniqid } from '../Utils/Functions'
import { ITransactionData, TransactionData } from "./TransactionData";

export interface IPayForm extends ITransactionData {
  order?:string
  invoice:string
  amountDebit:string | number
}
export class PayForm extends TransactionData {
  order?:string;
  invoice:string
  amountDebit:string | number
  constructor (data) {
    super(data)
    this.order = data.order || uniqid()
    this.invoice = data.invoice
    this.amountDebit = data.amountDebit
  }
}
