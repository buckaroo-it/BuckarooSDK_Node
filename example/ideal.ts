require('../BuckarooClient.test')

import Ideal from '../src/PaymentMethods/Ideal'

const ideal = new Ideal()
async function startIdealPayment() {
    return await ideal.pay({
        amountDebit: 10.1,
        issuer: 'ABNANL2A',
        clientIP: {
            address: '123.456.789.123',
            type: 0
        },
        description: 'Ideal Payment'
    })
}
startIdealPayment().then((response) => {
    response.getRedirectUrl()
})
