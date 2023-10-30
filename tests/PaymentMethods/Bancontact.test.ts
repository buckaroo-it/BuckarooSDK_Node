import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';

const method = buckarooClientTest.method('bancontactmrcash');

describe('BanContact methods', () => {
    test('Pay Simple Payload', async () => {
        await method
            .pay({
                amountDebit: 100,
                saveToken: true,
            })
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
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Authenticate', async () => {
        await method.authenticate({ invoice: uniqid(), amountDebit: 100 }).then((data) => {
            expect(data.isWaitingOnUserInput()).toBeDefined();
        });
    });
    test('PayOneClick', async () => {
        await method
            .payOneClick({
                invoice: uniqid(),
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                amountDebit: 100,
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('CompletePayment', async () => {
        await method
            .completePayment({
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                encryptedCardData: 'XXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('PayEncrypted', async () => {
        await method
            .payEncrypted({
                invoice: uniqid(),
                amountDebit: 100,
                encryptedCardData: 'XXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('PayRecurring', async () => {
        await method
            .payRecurring({
                invoice: uniqid(),
                amountDebit: 100,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});
