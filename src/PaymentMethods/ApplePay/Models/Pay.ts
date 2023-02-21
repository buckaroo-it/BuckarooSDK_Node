import { ITransactionData } from "../../../Models/TransactionData";

export interface IPay extends ITransactionData{
  paymentData:string
  customerCardName?:string
}

export default class Pay implements IPay{
  paymentData
  customerCardName?
  constructor (data) {
    this.paymentData = data.paymentData
    this.customerCardName = data.customerCardName || ''
  }
}
