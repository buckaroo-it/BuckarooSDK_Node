import Gender from '../../src/Constants/Gender'
import BankTransfer from '../../src/PaymentMethods/BankTransfer'

require('../BuckarooClient.test')

const method = BankTransfer()

describe('Transfer methods', () => {
    test('Specification', async () => {
        await method.specification().then((res) => {
            console.log(res)
        })
    })
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 32,
                country: '',
                customer: {
                    firstName: '432',
                    gender: Gender.FEMALE,
                    lastName: '324'
                },
                dateDue: '',
                email: '',
                sendMail: false
            })
            .then((res) => {
                expect(res.isAwaitingConsumer()).toBeTruthy()
            })
    })
})
