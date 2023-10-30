import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';

const method = buckarooClientTest.method('visa');

describe('testing methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
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
    test('Authorize', async () => {
        await method
            .authorize({
                amountDebit: 100,
            })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeTruthy();
            });
    });
    test('PayEncrypted', async () => {
        await method
            .payEncrypted({
                amountDebit: 100,
                name: 'Visa',
                encryptedCardData: 'XXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test('PayWithSecurityCode', async () => {
        await method
            .payWithSecurityCode({
                amountDebit: 100,
                encryptedSecurityCode: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                name: 'Visa',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('AuthorizeWithSecurityCode', async () => {
        await method
            .authorizeWithSecurityCode({
                amountDebit: 100,
                encryptedSecurityCode: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                name: 'Visa',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('AuthorizeEncrypted', async () => {
        await method
            .authorizeEncrypted({
                amountDebit: 100,
                encryptedCardData: 'XXXXXXXXXXXXXXXXXXXXXXXX',
                name: 'Visa',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('CancelAuthorize', async () => {
        await method
            .cancelAuthorize({
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                amountCredit: 100,
                name: 'Visa',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Capture', async () => {
        await method
            .capture({
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                amountDebit: 100,
                name: 'Visa',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('PayRecurrent', async () => {
        await method
            .payRecurrent({
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                amountDebit: 100,
                name: 'Visa',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});
