import PaymentMethod from '../PaymentMethod'
import Pay from './Models/Pay'
import { IPay } from "../Bancontact/Models/Pay";


const alipay = new PaymentMethod('alipay')

const pay = (data:IPay) => alipay.pay(data,new Pay(data));

const refund = (data:IPay) => alipay.pay(data,new Pay(data),'Refund');

const payRemainder = (data:IPay) => alipay.pay(data,new Pay(data),'PayRemainder');

export  {
  refund,
  pay,
  payRemainder
}