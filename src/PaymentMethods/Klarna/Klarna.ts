import PaymentMethod from '../PaymentMethod'
import Pay, { IPay } from './Models/Pay'


const klarna = new PaymentMethod('klarna',1,['description'])

const pay = (data:IPay) => klarna.pay(data,new Pay(data));
const refund = (data:IPay) => klarna.pay(data,new Pay(data),'refund')
const payInInstallments = (data:IPay) => klarna.pay(data,new Pay(data),'PayInInstallments')

export {
  pay,
  refund,
  payInInstallments
}