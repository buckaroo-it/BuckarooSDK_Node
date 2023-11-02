import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('buckaroovoucher');

describe('testing methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
                voucherCode: 'XXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('GetBalance', async () => {
        await method
            .getBalance({
                voucherCode: 'XXXXXXX',
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
                validUntil: '2024-01-01',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('DeactivateVoucher', async () => {
        await method
            .deactivate({
                voucherCode: 'XXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});
