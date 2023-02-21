import PaymentMethod from '../PaymentMethod'
import { IPayForm } from "../../Models/PayForm";

class Sepa extends PaymentMethod {
  constructor() {
    super({
      paymentName:'paypal'
    });
  }
}

const sepa = new Sepa()

const pay = (data:IPayForm) => sepa.pay(data,{});
const authorize = (data:IPayForm) =>sepa.pay(data,{},'Authorize')
const payRecurrent = (data:IPayForm) => sepa.pay(data,{},'PayRecurrent');

const extraInfo = (data:IPayForm) => sepa.pay(data,{},'Pay,ExtraInfo');

const payWithEmandate = (data:IPayForm) => sepa.pay(data,{},'payWithEmandate')

export {
  pay,
  authorize,
  payRecurrent,
  extraInfo,
  payWithEmandate
}