import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('buckaroovoucher');

describe('testing methods', () => {
    test('Pay', async () => {
        return method
            .pay({
                amountDebit: 100,
                voucherCode: 'XXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test('Refund', async () => {
        return method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test('GetBalance', async () => {
        return method
            .getBalance({
                voucherCode: 'XXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy();
            });
    });
    test('CreateApplication', async () => {
        return method
            .create({
                creationBalance: 12,
                usageType: 1,
                validFrom: '2021-01-01',
                validUntil: '2024-01-01',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test('DeactivateVoucher', async () => {
        return method
            .deactivate({
                voucherCode: 'XXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
});
