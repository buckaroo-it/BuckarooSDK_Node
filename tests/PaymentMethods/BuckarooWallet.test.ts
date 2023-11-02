import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('BuckarooWalletCollecting');

describe('BuckarooWallet methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                invoice: uniqid(),
                amountDebit: 100,
                walletId: 'XXXXXXXXXXXXXXXXXXXXX',
            })
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
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
                expect(data.isFailed()).toBeTruthy();
            });
    });
    test('CancelReservation', async () => {
        await method
            .cancel({
                invoice: uniqid(),
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                amountDebit: 100,
                walletMutationGuid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test('deposit', async () => {
        await method
            .deposit({
                invoice: uniqid(),
                walletId: 'XXXXXXXXXXXXXXXXXXXXX',
                amountCredit: 100,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Update', async () => {
        await method
            .update({
                walletId: 'XXXXXXXXXXXXXXXXXXXXX',
                status: 'Disabled',
                email: 'test@buckaroo.nl',
                customer: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                },
                bankAccount: {
                    iban: 'NLXXTESTXXXXXXXXXX',
                },
            })
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Withdrawal', async () => {
        await method
            .withdrawal({
                invoice: uniqid(),
                walletId: 'XXXXXXXXXXXXXXXXXXXXX',
                amountDebit: 100,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test('Create Wallet', async () => {
        await method
            .create({
                walletId: 'XXXXXXXXXXXXXXXXXXXXX',
                email: 'test@buckaroo.nl',
                customer: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                },
                bankAccount: {
                    iban: 'NLXXTESTXXXXXXXXXX',
                },
            })
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('GetInfo', async () => {
        await method
            .getInfo({
                walletId: 'XXXXXXXXXXXXXXXXXXXXX',
            })
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
});
