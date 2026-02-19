import { uniqid } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('googlepay');

describe('GooglePay methods', () => {
    test('Pay', async () => {
        return method
            .pay({
                amountDebit: 100,
                invoice: uniqid(),
                paymentData: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                customerCardName: 'XXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test('PayRemainder', async () => {
        return method
            .payRemainder({
                amountDebit: 100,
                invoice: uniqid(),
                paymentData: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                customerCardName: 'XXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test('Pay Redirect Payload', async () => {
        return method
            .payRedirect({
                amountDebit: 100,
                invoice: uniqid(),
                servicesSelectableByClient: 'googlepay',
                continueOnIncomplete: true,
            })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeTruthy();
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
});
