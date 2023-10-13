import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';

const method = buckarooClientTest.method('BuckarooWalletCollecting');

describe('BuckarooWallet methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                invoice: 'string',
                amountDebit: 12,
                walletId: '2',
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                invoice: 'string',
                amountCredit: 12,
                originalTransactionKey: '46FB241693914AA4AE7A8B6DB33DE',
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy();
            });
    });
    test('CancelReservation', async () => {
        await method
            .cancel({
                invoice: 'BuckarooWalletInvoiceId',
                originalTransactionKey: '46FB241693914AA4AE7A8B6DB33DE',
                amountDebit: 1,
                walletMutationGuid: '49B018248ECE4346AC20B902',
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test('deposit', async () => {
        await method
            .deposit({
                invoice: 'string',
                walletId: '',
                amountCredit: 12,
                originalTransactionKey: '',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Update', async () => {
        await method
            .update({
                walletId: '10',
                status: 'Disabled',
                email: 'test@buckaroo.nl',
                customer: {
                    firstName: 'John',
                    lastName: 'string',
                },
                bankAccount: {
                    iban: 'NL13TEST0123456789',
                },
            })
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Withdrawal', async () => {
        await method
            .withdrawal({
                invoice: 'BuckarooWalletInvoiceId',
                walletId: '10',
                amountDebit: 10,
                originalTransactionKey: '46FB241693914AA4AE7A8B6DB33DE',
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test('Create Wallet', async () => {
        await method
            .create({
                walletId: uniqid(),
                email: 'test@buckaroo.nl',
                customer: {
                    firstName: 'John',
                    lastName: 'string',
                },
                bankAccount: {
                    iban: 'NL13TEST0123456789',
                },
            })
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('GetInfo', async () => {
        await method
            .getInfo({
                walletId: '10',
            })
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
});
