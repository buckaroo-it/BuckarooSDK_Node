import { initializeBuckarooClient } from '../BuckarooClient'
import Trustly from '../PaymentMethods/Trustly'

initializeBuckarooClient()

const method = Trustly()

describe('Trustly', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 3.5,
                country: 'DE',
                customer: {
                    firstName: 'test',
                    lastName: 'a'
                }
            })
            .then((response) => {
                console.log(response)
                console.log(response.find('parameterErrors'))
            })
    })
})
