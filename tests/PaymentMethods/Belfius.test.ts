import buckarooClientTest from '../BuckarooClient.test'

const method = buckarooClientTest.method('belfius')

describe('testing methods', () => {
    test('Pay Simple Payload', async () => {
        await method
            .pay({
                amountDebit: 10
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 5,
                originalTransactionKey: '86CFE2CB5901463EADE061633BDB9EC8'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('Specifications', async () => {
        await method
            .specification()
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
})
