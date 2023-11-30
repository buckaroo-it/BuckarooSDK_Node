import client from './BuckarooClient.test';
import { HttpClientResponse, IRequest, TransactionResponse, uniqid } from '../src';
import { creditManagementTestInvoice } from './PaymentMethods/CreditManagment.test';

describe('Testing Buckaroo Client', () => {
    test('Credentials', () => {
        return client.confirmCredentials().then((response) => {
            expect(response).toBeTruthy();
        });
    });
    test('Batch transaction', async () => {
        const transactionData: IRequest[] = [];
        const creditManagement = client.method('CreditManagement3');
        const sepaDirectDebit = client.method('sepadirectdebit');
        for (let i = 0; i < 3; i++) {
            const combinedInvoice = creditManagement.createCombinedInvoice(creditManagementTestInvoice());

            const sepaRequest = sepaDirectDebit.combine(combinedInvoice.data).pay({
                iban: 'NL39RABO0300065264',
                bic: 'RABONL2U',
                mandateReference: '1DCtestreference',
                mandateDate: '2022-07-03',
                collectDate: '2020-07-03',
                amountDebit: 10.1,
                customer: {
                    name: 'John Smith',
                },
                invoice: uniqid('TestInvoice'),
            });

            transactionData.push(sepaRequest.data);
        }

        await client.batch
            .transaction(transactionData)
            .request()
            .then((response) => {
                expect(response.data.message === '3 transactions were queued for processing.').toBeTruthy();
            })
            .catch((err) => {
                expect(err).toBeUndefined();
            });
    });
    describe('Transaction', () => {
        const transactionService = client.transaction('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        test('transaction Status', async () => {
            await transactionService
                .status()
                .then((res) => {
                    expect(res instanceof TransactionResponse).toBeTruthy();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                });
        });
        test('transaction Cancel Info', async () => {
            await transactionService.cancelInfo().then((res) => {
                expect(res instanceof HttpClientResponse).toBeTruthy();
            });
        });

        test('transaction Refund Info', async () => {
            await transactionService.refundInfo().then((res) => {
                expect(res instanceof HttpClientResponse).toBeTruthy();
            });
        });
    });

    describe('Active Subscription', () => {
        test('Get', async () => {
            await client.getActiveSubscriptions().then((response) => {
                expect(response).toBeDefined();
            });
        });
    });
});
