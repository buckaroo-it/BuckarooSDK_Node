import Pay , { IPay } from './Models/Pay'
import Refund, { IRefund } from "./Models/Refund";
import PayEncrypted, { IPayEncrypted } from './Models/PayEncrypted'
import Authenticate, { IAuthenticate } from './Models/Authenticate'
import PayRecurring, { IPayRecurring } from './Models/PayRecurring'
import PaymentMethod from "../PaymentMethod";



const bancontact = PaymentMethod.fromName('bancontactmrcash')
const pay = (data:IPay) =>  bancontact.pay(data,new Pay(data))
const refund = (data:IRefund) =>  bancontact.pay(data,{},'Refund')
const payRemainder = (data) =>  bancontact.pay(data,{},'PayRemainder')
const payEncrypted = (data:IPayEncrypted) =>  bancontact.pay(data,{},'PayEncrypted')
const payOneClick = (data) =>  bancontact.pay(data,{},'PayOneClick')
const payRecurring = (data:IPayRecurring) =>  bancontact.pay(data,{},'PayRecurring')
const authenticate = (data:IAuthenticate) => bancontact.pay(data,{},'Authenticate')
const authenticateMobile = (data) => bancontact.pay(data,{},'AuthenticateMobile')

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