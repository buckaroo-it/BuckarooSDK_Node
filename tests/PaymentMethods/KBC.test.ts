import buckarooClientTest from '../BuckarooClient.test'
const method = buckarooClientTest.method('KBCPaymentButton')

describe('Testing KBC methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 10
            })
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy()
            })
    })
    test('Refund', async () => {
        method
            .refund({
                amountCredit: 10,
                originalTransactionKey: 'B5675356904444F3965C33D280591C74'
            })
            .request()
            .then((response) => {
                expect(response.isFailed()).toBeTruthy()
            })
    })
})
