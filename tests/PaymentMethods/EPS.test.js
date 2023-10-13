import buckarooClientTest from '../BuckarooClient.test';
const method = buckarooClientTest.method('eps');
describe('Testing Eps methods', () => {
    test('Pay', async () => {
        await method
            .pay({
            amountDebit: 10.1
        })
            .request()
            .then((response) => {
            expect(response.isSuccess()).toBeTruthy();
        });
    });
    test('Refund', async () => {
        method
            .refund({
            amountCredit: 10.1,
            originalTransactionKey: '1234567890'
        })
            .request()
            .then((response) => {
            expect(response.isFailed()).toBeTruthy();
        });
    });
});
