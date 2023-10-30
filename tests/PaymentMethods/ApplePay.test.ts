import { uniqid } from '../../src/Utils/Functions';
import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('applepay');

describe('Applepay methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
                invoice: uniqid(),
                paymentData: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                customerCardName: 'XXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Pay Redirect Payload', async () => {
        await method
            .payRedirect({
                amountDebit: 100,
                invoice: uniqid(),
                servicesSelectableByClient: 'applepay',
                continueOnIncomplete: true,
            })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeTruthy();
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
});
