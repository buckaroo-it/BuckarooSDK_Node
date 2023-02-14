import { uniqid } from '../Utils/Functions'
import BuckarooClient from '../BuckarooClient'
import Przelewy24 from '../PaymentMethods/Przelewy24/Przelewy24'

require('dotenv').config({ path: '../../.env' })

const client = new BuckarooClient()
const method = new Przelewy24(client)

method.pay({
  amountDebit: 3.5,
  invoice: uniqid(),
  email: 'test@test.nl',
  customer: {
    firstName: 'John',
    lastName: 'Smith'
  }
})
