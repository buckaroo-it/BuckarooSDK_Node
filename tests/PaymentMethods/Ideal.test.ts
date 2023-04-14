require('../BuckarooClient.test')
import { uniqid } from '../../src/Utils/Functions'
import Ideal from '../../src/PaymentMethods/Ideal/index'

const ideal = new Ideal()
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
                clientIP: {
                    address: '123.456.789.123',
                    type: 0
                },
                additionalParameters: {
                    initiated_by_magento: 1,
                    service_action: 'something'
                }
            })
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
                clientIP: {
                    address: '123.456.789.123',
                    type: 0
                },
                additionalParameters: {
                    initiated_by_magento: '1',
                    service_action: 'something'
                }
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
})
