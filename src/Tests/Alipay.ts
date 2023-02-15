import api from '../index'
import { pay,refund,payRemainder } from '../PaymentMethods/Alipay/Alipay'
import { uniqid } from '../Utils/Functions'
require('dotenv').config({ path: '../../.env' })


pay({
  amountDebit: 10,
  invoice: uniqid(),
  useMobileView: true
})