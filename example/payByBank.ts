require('../BuckarooClient.test')

import PaymentInitiation from '../src/PaymentMethods/PaymentInitiation'

const payByBank = new PaymentInitiation()
async function startPayByBankPayment() {
    return await payByBank.pay({
        amountDebit: 10.1,
        issuer: 'ABNANL2A',
        countryCode: "NL",
    })
}
