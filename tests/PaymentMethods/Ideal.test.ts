import { uniqid } from '../../src/Utils/Functions'
import buckarooClientTest from '../BuckarooClient.test'
const ideal = buckarooClientTest.method('ideal')
describe('testing Ideal methods', () => {
    test('Issuers', async () => {
        await ideal.issuers().then((response) => {
            expect(Array.isArray(response)).toBeTruthy()
        })
    })
    test('Pay Simple Payload', async () => {
        await ideal
            .pay({
                amountDebit: 10.1,
                issuer: 'ABNANL2A',
                continueOnIncomplete: false,
                additionalParameters: {
                    initiated_by_magento: 1,
                    service_action: 'something'
                }
            })
            .request()
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await ideal
            .refund({
                order: uniqid(),
                invoice: uniqid(),
                originalTransactionKey: '97DC0A03BBDF4DAAAC694D7FEC8785E1',
                amountCredit: 4.23,
                clientIP: '123.456.789.123',
                additionalParameters: {
                    initiated_by_magento: '1',
                    service_action: 'something'
                }
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('InstantRefund', async () => {
        await ideal
            .instantRefund({
                amountCredit: 4.23,
                originalTransactionKey: '97DC0A03BBDF4DAAAC694D7FEC8785E1'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
})
