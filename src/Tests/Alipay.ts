import { pay,refund,payRemainder } from '../PaymentMethods/Alipay/Alipay'
import { uniqid } from '../Utils/Functions'


pay({
  amountDebit: 10,
  invoice: uniqid(),
  useMobileView: true
})