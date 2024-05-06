import { getIPAddress, uniqid } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';

const ideal = buckarooClientTest.method('ideal');
describe('testing Ideal methods', () => {
    test('Issuers', async () => {
        return ideal.issuers().then((response) => {
            expect(Array.isArray(response)).toBeTruthy();
        });
    });
    test('Pay Simple Payload', async () => {
        return ideal
            .pay({
                amountDebit: 100,
                issuer: 'ABNANL2A',
                continueOnIncomplete: false,
                additionalParameters: {
                    initiated_by_magento: 1,
                    service_action: 'something',
                },
            })
            .request()
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        return ideal
            .refund({
                order: uniqid(),
                invoice: uniqid(),
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                amountCredit: 0.01,
                clientIP: getIPAddress(),
                additionalParameters: {
                    initiated_by_magento: '1',
                    service_action: 'something',
                },
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy();
            });
    });
    test('InstantRefund', async () => {
        return ideal
            .instantRefund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy();
            });
    });
});
