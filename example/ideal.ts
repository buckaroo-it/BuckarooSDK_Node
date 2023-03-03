import { initializeBuckarooClient } from '../src/BuckarooClient'

initializeBuckarooClient()

import { ideal } from '../src/PaymentMethods/Ideal/Ideal'

;(async () => {
    try {
        const response = await ideal.pay({
            order: '123',
            invoice: '894156',
            amountDebit: 10.1,
            issuer: 'ABNANL2A',
            clientIP: {
                address: '123.456.789.123',
                type: 0
            },
            description: 'Ideal Payment',
            additionalParameters: {
                initiated_by_magento: 1,
                service_action: 'something'
            }
        })
        console.log(response)
    } catch (error) {
        console.warn(error)
    }
})()
