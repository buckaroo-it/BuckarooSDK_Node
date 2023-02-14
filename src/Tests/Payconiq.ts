import BuckarooClient from '../BuckarooClient'
import Payconiq from '../PaymentMethods/Payconiq/Payconiq'
import { uniqid } from '../Utils/Functions'
require('dotenv').config({ path: '../../.env' })

const client = new BuckarooClient()
const method = new Payconiq(client)

method.pay({
  amountDebit: 10,
  description: 'Payment for testinvoice123',
  invoice: uniqid()
})
