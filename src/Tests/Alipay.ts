import BuckarooClient from '../BuckarooClient'
import Alipay from '../PaymentMethods/Alipay/Alipay'
import { uniqid } from '../Utils/Functions'
require('dotenv').config({ path: '../../.env' })

const client = new BuckarooClient()
const method = new Alipay(client)

method.pay({
  amountDebit: 10,
  invoice: uniqid(),
  useMobileView: true
})
