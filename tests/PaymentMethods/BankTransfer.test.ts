import BankTransfer from '../../src/PaymentMethods/BankTransfer'
import Gender from '../../src/Constants/Gender'

require('../BuckarooClient.test')

const method = new BankTransfer()

describe('Transfer methods', () => {
    test('Specification', async () => {
        await method.specification().then((res) => {
            expect(res).toBeDefined()
        })
    })
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 10,
                customerCountry: 'NL',
                customerEmail: 'test@hotmail.com',
                customerFirstName: 'test',
                customerGender: Gender.FEMALE,
                customerLastName: 'Test',
                description: 'Test without payment method with ServicesSelectableByClient',
                continueOnIncomplete: 1,
                servicesSelectableByClient: 'ideal,creditcard'
            })
            .then((res) => {
                expect(res.isAwaitingConsumer()).toBeDefined()
            })
    })
})
