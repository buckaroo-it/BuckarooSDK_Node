import { ideal } from '../PaymentMethods/Ideal/Ideal'
import { uniqid } from '../Utils/Functions'
import { initializeBuckarooClient } from "../BuckarooClient";
import { TransactionResponse } from "../Models/TransactionResponse";
initializeBuckarooClient()


describe('testing Ideal methods', () => {
    test('Issuers', async () => {
        await ideal.issuers().then((data) => {

        })
    })
    test('Pay Simple Payload', async () => {
        ideal.setPayload({
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
        await ideal.pay().then((data) => {
            data.Status.Code.Code;
            expect(typeof data).toBe('TransactionResponse')
            transactionKey = data.Key
        })
    })
    test('Refund', async () => {
        await create_ideal_Refund().then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('Specifications',async ()=>{
        const idealS = await ideal.specifications()
        console.log(idealS)
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