require('../BuckarooClient.test')
import Trustly from '../../src/PaymentMethods/Trustly/index'

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
