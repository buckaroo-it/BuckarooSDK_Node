import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('bancontactmrcash');

describe('BanContact methods', () => {
    test('Pay Simple Payload', async () => {
        return method
            .pay({
                amountDebit: 100,
                saveToken: true,
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
    test('Authenticate', async () => {
        return method
            .authenticate({ invoice: uniqid(), amountDebit: 100 })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeDefined();
            });
    });
    test('PayOneClick', async () => {
        return method
            .payOneClick({
                invoice: uniqid(),
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                amountDebit: 100,
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test('CompletePayment', async () => {
        return method
            .completePayment({
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                encryptedCardData: 'XXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test('PayEncrypted', async () => {
        return method
            .payEncrypted({
                invoice: uniqid(),
                amountDebit: 100,
                encryptedCardData: 'XXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test('PayRecurring', async () => {
        return method
            .payRecurring({
                invoice: uniqid(),
                amountDebit: 100,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
});
