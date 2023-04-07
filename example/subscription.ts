require('./BuckarooClient')
import Subscriptions from '../src/PaymentMethods/Subscriptions'
import Ideal from '../src/PaymentMethods/Ideal'

const subscription = new Subscriptions().createCombined({
    address: undefined,
    allowedServices: '',
    b2b: '',
    bankAccount: { accountName: '', bic: '', iban: '' },
    billingTiming: 0,
    company: undefined,
    configuration: undefined,
    configurationCode: '',
    customerAccountName: '',
    customerBIC: '',
    customerIBAN: '',
    debtor: { code: '' },
    email: '',
    includeTransaction: false,
    mandateReference: '',
    person: undefined,
    phone: undefined,
    ratePlan: undefined,
    ratePlanCharge: undefined,
    subscriptionGuid: '',
    termStartDay: 0,
    termStartMonth: 0,
    termStartWeek: '',
    transactionVatPercentage: 0
})

;(async () => {
    const combinedPayment = await new Ideal().combine(subscription).pay({
        issuer: 'ABNANL2A',
        amountDebit: 10
    })
})()
