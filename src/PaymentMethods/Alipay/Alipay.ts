import PaymentMethod from '../PaymentMethod'
import Pay from './Models/Pay'
import api from "../../index";
import { IPay } from "../Bancontact/Models/Pay";

class Alipay extends PaymentMethod {
  protected requiredConfigFields: string[] = []
  paymentName = 'alipay'
  // constructor () {
  //   super()
  //   this.paymentName = 'alipay'
  //   this.requiredConfigFields = this.requiredConfigFields.concat(
  //     this.requiredFields
  //   )
  // }

}


const alipay = new Alipay()

const pay = (data:IPay) => alipay.pay(data,new Pay(data));

const refund = (data:IPay) => alipay.pay(data,new Refund(data),'Refund');

const payRemainder = (data:IPay) => alipay.pay(data,new PayRemainder(data),'PayRemainder');

export  {
  refund,
  pay,
  payRemainder
}