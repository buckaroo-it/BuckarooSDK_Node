import buckarooClientTest from '../BuckarooClient.test'

const method = buckarooClientTest.method('creditclick')

describe('Testing CreditClick methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 31,
                person: {
                    firstName: 'test',
                    lastName: 'test'
                },
                email: 't.tester@test.nl'
            })
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 31,
                originalTransactionKey: 'C85BABFCCA2D4921B9CFBA0EBDF82C70',
                description: 'test',
                refundReason: 'Fraudulent'
            })
            .request()
            .then((response) => {
                expect(response.isFailed()).toBeTruthy()
            })
    })
})
