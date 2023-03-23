require('../BuckarooClient.test')
import { uniqid } from '../../src/Utils/Functions'
import Ideal from '../../src/PaymentMethods/Ideal/index'

const ideal = Ideal()
describe('testing Ideal methods', () => {
    test('Issuers', async () => {
        await ideal.issuers().then((response) => {
            console.log(response)
        })
    })
    test('Pay Simple Payload', async () => {
        ideal.setPayload({
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
        await ideal.pay().then((data) => {
            expect(data).toBeDefined()
            console.log(data)
        })
    })
    test('Refund', async () => {
        await create_ideal_Refund().then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('Specifications', async () => {
        const idealSpecifications = await ideal.specification()
        console.log(idealSpecifications)
    })
})

let transactionKey = '97DC0A03BBDF4DAAAC694D7FEC8785E1'

function create_ideal_Refund() {
    return ideal.refund({
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
