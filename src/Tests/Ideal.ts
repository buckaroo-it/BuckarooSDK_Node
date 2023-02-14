import { uniqid } from '../Utils/Functions'
import BuckarooClient from '../BuckarooClient'
import Ideal from '../PaymentMethods/Ideal/Ideal'

require('dotenv').config({ path: '../../.env' })

const client = new BuckarooClient()
const method = new Ideal(client)

method.pay({
  returnURL: 'https://example.com/return',
  invoice: uniqid(),
  amountDebit: 10.1,
  issuer: 'ABNANL2A'
})

// method.payRemainder({
//   returnURL: "https://example.com/return",
//   invoice: uniqid(),
//   amountDebit: 10.1,
//   issuer: "ABNANL2A",
// });

// method.issuers();
