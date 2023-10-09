import buckarooClientTest from "../BuckarooClient.test";
const payconiq = buckarooClientTest.method("payconiq");
describe('Payconiq', () => {
    test('Pay', async () => {
        await payconiq
            .pay({
                amountDebit: 50.3,
                order: '123456'
            }).request()
            .then((info) => {
                expect(info.data).toBeDefined()
            })
    })
    test('Refund', async () => {
        await payconiq
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: '123456'
            }).request()
            .then((info) => {
                expect(info.data).toBeDefined()
            })
    })
    test('InstantRefund', async () => {
        await payconiq
            .instantRefund({
                amountCredit: 4.23,
                originalTransactionKey: '97DC0A03BBDF4DAAAC694D7FEC8785E1'
            }).request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
})
