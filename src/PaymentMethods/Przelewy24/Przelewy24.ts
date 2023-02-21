import PaymentMethod from '../PaymentMethod'
import { IPayForm } from "../../Models/PayForm";

class Przelewy24 extends PaymentMethod {

  constructor() {
    super({
      paymentName:'Przelewy24'
    });
  }
}
const przelewy24 = new Przelewy24();

const pay = (data:IPayForm) => przelewy24.pay(data,{})

export {
  pay
}
