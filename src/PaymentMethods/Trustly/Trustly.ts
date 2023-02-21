import PaymentMethod from '../PaymentMethod'

export default class Trustly extends PaymentMethod {
  // public serviceVersion = 1
  constructor () {
    super({
      paymentName:'Trustly'
    })
  }
}
const trustly = new Trustly()

const pay = (data) => trustly.pay(data,{})

export {
  pay
}