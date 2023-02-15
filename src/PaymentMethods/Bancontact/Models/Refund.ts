import Model from "../../../Models/Model";
import { IPayForm } from "../../../Models/PayForm";

export interface IRefund extends IPayForm{
  customeraccountname:string
  customerbic:string
  customeriban:string
}
export default class Refund extends Model{
  customeraccountname:string = ''
  customerbic:string = ''
  customeriban:string = ''
  constructor (data) {
    super()
    this.setParameters(data)
  }
}
