import PaymentMethod from '../PaymentMethod'
// import Pay from './Models/Pay'
import Pay ,{ IPay } from './Models/Pay'

class AfterPay extends PaymentMethod {
  protected requiredConfigFields: string[] = []
  paymentName = 'afterpay'
  // constructor() {
  //   super();
  //   this.paymentName = "afterpay"
  //   this.requiredConfigFields = this.requiredFields.concat(
  //     this.requiredConfigFields
  //   )
  // }

}
class Refund {
  constructor(data) {
  }
}
class Authorize {
  constructor(data) {
  }
}class Capture {
  constructor(data) {
  }
}class CancelAuthorize {
  constructor(data) {
  }
}class PayRemainder {
  constructor(data) {
  }
}class AuthorizeRemainder {
  constructor(data) {
  }
}
const afterpay = new AfterPay()
const pay = (data:IPay) => afterpay.pay(data,new Pay(data));
const refund = (data) => afterpay.pay(data,new Refund(data),'Refund');

const authorize = (data) => afterpay.pay(data,new Authorize(data),'Authorize');
const capture = (data) => afterpay.pay(data,new Capture(data),'Capture');
const cancelAuthorize = (data) => afterpay.pay(data,new CancelAuthorize(data),'CancelAuthorize');
const payRemainder = (data) => afterpay.pay(data,new PayRemainder(data),'PayRemainder')
const authorizeRemainder = (data) => afterpay.pay(data,new AuthorizeRemainder(data),'AuthorizeRemainder')

export  {
  pay,
  authorize,
  capture,
  refund,
  authorizeRemainder
}