import Pay , { IPay } from './Models/Pay'
import Refund, { IRefund } from "./Models/Refund";
import PayEncrypted, { IPayEncrypted } from './Models/PayEncrypted'
import Authenticate, { IAuthenticate } from './Models/Authenticate'
import PayRecurring, { IPayRecurring } from './Models/PayRecurring'
import PaymentMethod from "../PaymentMethod";

class Bancontact extends PaymentMethod {
  public requiredConfigFields: string[]
  constructor () {
    super()
    this.paymentName = 'bancontactmrcash'
    this.requiredConfigFields = this.requiredFields
  }
  async pay(data:IPay){
    return await super.pay(data,new Pay(data));
  }
  async refund (data: IRefund) {
    return await super.pay(data,new Refund(data),'Refund');
  }
  async payRemainder (data) {
    return await super.pay(data,{},'PayRemainder')
  }
  async payEncrypted (data: IPayEncrypted) {
    return await super.pay(data,new PayEncrypted(data),'PayEncrypted');
  }
  async payOneClick (data) {
    return await  super.pay(data,{},'PayOneClick')
  }
  async payRecurring (data: IPayRecurring) {
    return await super.pay(data,new PayRecurring(data),'PayRecurring');
  }
  async authenticate (data: IAuthenticate) {
    return await super.pay(data,new Authenticate(data),'Authenticate');
  }
  async authenticateMobile (data) {
    return await super.pay(data,{},'AuthenticateMobile')
  }
}


const bancontact = new Bancontact()
const pay = bancontact.pay
const refund = bancontact.refund
const payRemainder = bancontact.payRemainder
const payEncrypted = bancontact.payEncrypted
const payOneClick = bancontact.payOneClick
const payRecurring = bancontact.payRecurring
const authenticate = bancontact.authenticate
const authenticateMobile = bancontact.authenticateMobile

export {
  pay,
  refund,
  payRemainder,
  payEncrypted,
  payOneClick,
  payRecurring,
  authenticate,
  authenticateMobile
}