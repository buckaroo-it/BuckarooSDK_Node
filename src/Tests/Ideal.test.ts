import { Ideal } from '../PaymentMethods/Ideal/Ideal'
import { uniqid } from '../Utils/Functions'
import { initializeBuckarooClient } from "../BuckarooClient";
initializeBuckarooClient()

const idealTest = new Ideal()

describe('testing Ideal methods', () => {
    test('Issuers', async () => {
        await idealTest.issuers().then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('Pay Simple Payload', async () => {
        idealTest.setPayload({
            currency: "",
            order: uniqid(),
            invoice: uniqid(),
            amountDebit: 10.1,
            issuer: 'ABNANL2A',
            pushURL: 'https://buckaroo.nextto.dev/push',
            clientIP: {
                address: '123.456.789.123',
                type: 0
            },
            additionalParameters: {
                initiated_by_magento: 1,
                service_action: 'something'
            }
        })
        await idealTest.pay().then((data) => {
            expect(data).toBeDefined()
            transactionKey = data.Key
        })
    })
    test('Refund', async () => {
        await create_ideal_Refund().then((data) => {
            expect(data).toBeDefined()
        })
    })
})

let transactionKey = '97DC0A03BBDF4DAAAC694D7FEC8785E1'

function create_ideal_Refund() {
    return idealTest.refund({
        order: uniqid(),
        invoice: uniqid(),
        originalTransactionKey: transactionKey,
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
}