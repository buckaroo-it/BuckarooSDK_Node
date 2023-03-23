require('../BuckarooClient.test')
import BuckarooVoucher from '../../src/PaymentMethods/BuckarooVoucher/index'

const method = BuckarooVoucher()

describe('testing methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 12,
                voucherCode: ''
            })
            .then((data) => {
                expect(data).toBeDefined()
                console.log(data.find('ParameterErrors') || data.find('Parameters'))
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 12,
                originalTransactionKey: ''
            })
            .then((data) => {
                expect(data).toBeDefined()
                console.log(data.find('ParameterErrors') || data.find('Parameters'))
            })
    })
    test('GetBalance', async () => {
        await method
            .getBalance({
                voucherCode: ''
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('CreateApplication', async () => {
        await method
            .createApplication({
                creationBalance: 12,
                usageType: 1,
                validFrom: new Date(),
                validUntil: new Date()
            })
            .then((data) => {
                expect(data).toBeDefined()
                console.log(JSON.stringify(data))
            })
    })
    test('DeactivateVoucher', async () => {
        await method
            .deactivateVoucher({
                voucherCode: ''
            })
            .then((data) => {
                expect(data).toBeDefined()
                console.log(data.find('ParameterErrors') || data.find('Parameters'))
            })
    })
})
