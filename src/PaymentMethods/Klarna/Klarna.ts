import PaymentMethod from '../PaymentMethod'
import Pay, { IPay } from './Models/Pay'

class Klarna extends PaymentMethod {
  constructor() {
    super({
      paymentName:'klarna',
      serviceVersion: 1,
    });
  }
}

const klarna = new Klarna()

const pay = (data:IPay) => klarna.pay(data,new Pay(data));
const refund = (data:IPay) => klarna.pay(data,{},'refund')
const payInInstallments = (data:IPay) => klarna.pay(data,new Pay(data),'PayInInstallments')

export {
  pay,
  refund,
  payInInstallments
}