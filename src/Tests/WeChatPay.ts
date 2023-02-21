import { pay } from '../PaymentMethods/Sofort/Sofort'
import { uniqid } from '../Utils/Functions'
pay({
  amountDebit: 10,
  invoice: uniqid(),
  // locale: 'en-US'
})
