import { uniqid } from '../Utils/Functions'
import { pay } from '../PaymentMethods/Przelewy24/Przelewy24'

pay({
    amountDebit: 3.5,
    invoice: uniqid()
    // email: 'test@test.nl',
    // customer: {
    //   firstName: 'John',
    //   lastName: 'Smith'
    // }
})
