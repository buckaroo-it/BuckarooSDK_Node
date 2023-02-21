import PaymentMethod from '../PaymentMethod'
import { IPayForm } from "../../Models/PayForm";
import { IExtraInfo } from "../Paypal/Models/ExtraInfo";

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

const extraInfo = (data:IExtraInfo) => sepa.pay(data,{},'Pay,ExtraInfo');

const payWithEmandate = (data:IPayForm) => sepa.pay(data,{},'payWithEmandate')

export {
  pay,
  authorize,
  payRecurrent,
  extraInfo,
  payWithEmandate
}