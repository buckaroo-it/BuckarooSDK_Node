import buckarooClientTest from '../BuckarooClient.test'

const method = buckarooClientTest.method('boekenbon')

describe('GiftCard methods', () => {
    test('Pay', async () => {
        const responsePay = await method
            .pay({
                amountDebit: 10,
                intersolveCardnumber: '0000000000000000001',
                intersolvePIN: '500'
            })
            .request()
        expect(responsePay.isSuccess()).toBeTruthy()
        const responseRemainderPay = await buckarooClientTest
            .method('ideal')
            .payRemainder({
                amountDebit: 10.1,
                issuer: 'ABNANL2A',
                invoice: responsePay.data.invoice,
                originalTransactionKey:
                    responsePay.data.relatedTransactions[0].relatedTransactionKey
            })
            .request()
        expect(responseRemainderPay.isPendingProcessing()).toBeTruthy()
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 5,
                originalTransactionKey: '9F99B530DA5449EB919D27351D28BDF2',
                email: '',
                lastName: ''
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy()
            })
    })
})
