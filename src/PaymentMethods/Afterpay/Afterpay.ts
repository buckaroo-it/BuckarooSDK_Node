import PaymentMethod from '../PaymentMethod'
import Pay ,{ IPay } from './Models/Pay'
import { Refund } from "./Models/Refund";

const afterpay = new PaymentMethod('afterpay')
const pay = (data:IPay) => afterpay.pay(data,new Pay(data));
const refund = (data) => afterpay.pay(data,new Refund(data),'Refund');

const authorize = (data) => afterpay.pay(data,new Pay(data),'Authorize');
const capture = (data) => afterpay.pay(data,new Pay(data),'Capture');
const cancelAuthorize = (data) => afterpay.pay(data,{},'CancelAuthorize');
const payRemainder = (data) => afterpay.pay(data,new Pay(data),'PayRemainder')
const authorizeRemainder = (data) => afterpay.pay(data,new Pay(data),'AuthorizeRemainder')

export  {
  pay,
  authorize,
  capture,
  refund,
  authorizeRemainder
}