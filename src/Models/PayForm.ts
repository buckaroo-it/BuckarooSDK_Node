import { uniqid } from '../Utils/Functions'
import { TransactionData } from "./TransactionData";

export default class PayForm extends TransactionData{
  order:string;
  invoice:string
  amountDebit:string
  constructor (data) {
    super(data)
    this.order = data.order || uniqid()
    this.invoice = data.invoice
    this.amountDebit = data.amountDebit
    this.setParameters(data)
  }
}
