import { initializeBuckarooClient } from '../src/BuckarooClient'
import { subscriptions } from '../src/PaymentMethods/Subscriptions/Subscriptions'
import { ideal } from '../src/PaymentMethods/Ideal/Ideal'

initializeBuckarooClient()

const subscription = subscriptions().createCombined({
    includeTransaction: false,
    transactionVatPercentage: 5,
    configurationCode: 'gfyh9fe4',
    email: 'test@buckaroo.nl',
    ratePlans: {
        add: {
            startDate: '2033-01-01',
            ratePlanCode: '9863hdcj'
        }
    },
    phone: {
        mobile: '0612345678'
    },
    debtor: {
        code: 'johnsmith4'
    },
    company: {
        culture: 'nl-NL',
        companyName: 'My Company Coporation',
        vatApplicable: true,
        chamberOfCommerce: '20091741'
    },
    address: {
        street: 'Hoofdstraat',
        houseNumber: '90',
        zipcode: '8441ER',
        city: 'Heerenveen',
        country: 'NL'
    }
})

;(async () => {
    const combinedPayment = await ideal.combine(subscription).pay({
        issuer: 'ABNANL2A',
        amountDebit: 10
    })
})()
