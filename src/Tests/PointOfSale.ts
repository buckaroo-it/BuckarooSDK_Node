import {pay} from '../PaymentMethods/PointOfSale/PointOfSale'
import { uniqid } from '../Utils/Functions'


pay({
  invoice: uniqid(),
  amountDebit: 10.1,
  // terminalID: '50000001'
})
