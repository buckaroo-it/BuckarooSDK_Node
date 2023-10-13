import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('bancontactmrcash');

describe('BanContact methods', () => {
    test('Pay Simple Payload', async () => {
        await method
            .pay({
                amountDebit: 10,
                saveToken: true,
            })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 5,
                originalTransactionKey: 'F397DA6A251645F8BDD81547B5005B4B',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Authenticate', async () => {
        await method
            .authenticate({ amountDebit: 10 })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeDefined();
            });
    });
    test('PayOneClick', async () => {
        await method
            .payOneClick({
                originalTransactionKey: 'dsad',
                amountDebit: 12,
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('CompletePayment', async () => {
        await method
            .completePayment({
                originalTransactionKey: 'dsad',
                encryptedCardData: 'sUIB',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('PayEncrypted', async () => {
        await method
            .payEncrypted({
                amountDebit: 10,
                encryptedCardData: 'yrtgdd',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('PayRecurring', async () => {
        await method
            .payRecurring({
                amountDebit: 10,
                originalTransactionKey: 'sadas',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Specifications', () => {
        method
            .specification()
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});
