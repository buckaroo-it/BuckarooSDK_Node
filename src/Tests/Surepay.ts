import BuckarooClient from '../BuckarooClient'
import Surepay from '../PaymentMethods/Surepay/Surepay'
require('dotenv').config({ path: '../../.env' })

const client = new BuckarooClient()
const method = new Surepay(client)

method.verify({
  bankAccount: {
    iban: 'NL13TEST0123456789',
    accountName: 'John Doe'
  }
})
