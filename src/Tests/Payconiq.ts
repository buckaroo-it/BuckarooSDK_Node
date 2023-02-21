import { pay, payInInstallments } from '../PaymentMethods/Payconiq/Payconiq'
import { uniqid } from '../Utils/Functions'

pay({
    amountDebit: 10,
    description: 'Payment for testinvoice123',
    invoice: uniqid(),
    articles: [],
    billing: {
        address: {
            city: '',
            country: '',
            houseNumber: '',
            houseNumberAdditional: '',
            street: '',
            zipcode: ''
        },
        email: '',
        phone: {
            mobile: ''
        },
        recipient: {
            birthDate: '',
            category: '',
            firstName: '',
            gender: '',
            initials: '',
            lastName: '',
            name: '',
            placeOfBirth: ''
        }
    }
})
