import { pay } from '../PaymentMethods/Trustly/Trustly'
import { uniqid } from '../Utils/Functions'

pay({
  amountDebit: 10.1,
  invoice: uniqid(),
  country: 'De',
  customer: {
    firstName: 'Test',
    lastName: 'Aflever'
  }
})
