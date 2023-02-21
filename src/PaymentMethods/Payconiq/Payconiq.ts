import PaymentMethod from '../PaymentMethod'
import Pay, { IPay } from "../Klarna/Models/Pay";
// class Payconiq extends PaymentMethod {
//   constructor() {
//     super({
//       paymentName:'Payconiq'
//     });
//   }
// }


const payconiq = PaymentMethod.fromName('payconiq')

const pay = (data:IPay) => payconiq.pay(data,new Pay(data));
const refund = (data:IPay) => payconiq.pay(data,{},'refund')
const payInInstallments = (data:IPay) => payconiq.pay(data,new Pay(data),'PayInInstallments')

export {
  pay,
  refund,
  payInInstallments
}