import BuckarooClient from '../BuckarooClient'
import PointOfSale from '../PaymentMethods/PointOfSale/PointOfSale'
import { uniqid } from '../Utils/Functions'
require('dotenv').config({ path: '../../.env' })

const client = new BuckarooClient()
const method = new PointOfSale(client)

method.pay({
  invoice: uniqid(),
  amountDebit: 10.1,
  terminalID: '50000001'
})
