import Address from './Address'
import Phone from './Phone'
import Customer from '../../PayPerEmail/Models/Customer'
import { ITransactionData } from "../../../Models/TransactionData";
import IAddress from "../../../Models/IAddress";
import IPhone from "../../../Models/IPhone";
import IPerson from "../../../Models/IPerson";

export interface IExtraInfo extends ITransactionData{
  customer:{}
  address:IAddress
  phone?:IPhone
  noShipping?:number
  addressOverride?:boolean
}

export class ExtraInfo {
  customer:IPerson
  address:IAddress
  phone:IPhone
  noShipping:number
  addressOverride:boolean

  constructor(data) {
    this.customer = data.customer
    this.address = data.address
    this.phone = data.phone
    this.noShipping = data.noShipping
    this.addressOverride = data.addressOverride
  }

}
