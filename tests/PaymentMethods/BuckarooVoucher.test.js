import buckarooClientTest from '../BuckarooClient.test';
const method = buckarooClientTest.method('buckaroovoucher');
describe('testing methods', () => {
    test('Pay', async () => {
        await method
            .pay({
            amountDebit: 12,
            voucherCode: ''
        })
            .request()
            .then((data) => {
            expect(data).toBeDefined();
        });
    });
    test('Refund', async () => {
        await method
            .refund({
            amountCredit: 12,
            originalTransactionKey: ''
        })
            .request()
            .then((data) => {
            expect(data).toBeDefined();
        });
    });
    test('GetBalance', async () => {
        await method
            .getBalance({
            voucherCode: 'WP6W-XXXX-XXXX-56T7'
        })
            .request()
            .then((data) => {
            expect(data.isFailed()).toBeTruthy();
        });
    });
    test('CreateApplication', async () => {
        await method
            .create({
            creationBalance: 12,
            usageType: 1,
            validFrom: '2021-01-01',
            validUntil: '2024-01-01'
        })
            .request()
            .then((data) => {
            expect(data).toBeDefined();
        });
    });
    test('DeactivateVoucher', async () => {
        await method
            .deactivate({
            voucherCode: ''
        })
            .request()
            .then((data) => {
            expect(data).toBeDefined();
        });
    });
});
