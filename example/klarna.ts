require('./BuckarooClient')
import Klarna from '../src/PaymentMethods/Klarna'

const klarna = new Klarna()

klarna.pay({
    article: [
        {
                description: '',
                grossUnitPrice: 0,
                identifier: '',
                quantity: '',
                vatPercentage: ''
        }
    ],
    amountDebit: 0,
    billingCustomer: {
        city: '',
        country: '',
        email: '',
        firstName: '',
        lastName: '',
        postalCode: '',
        street: '',
        streetNumber: ''
    }
})
