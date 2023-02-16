import PaymentMethod from '../PaymentMethod'
import Pay,{IPay} from "./Models/Pay";

const applePay = new PaymentMethod('applepay')

const pay  = (data:IPay) => applePay.pay(data,new Pay(data))

const refund  = (data:IPay) => applePay.pay(data,new Pay(data))

export {
  pay,
  refund
}