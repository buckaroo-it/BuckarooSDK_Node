import client from './BuckarooClient.test';
import { TransactionResponse } from '../src/Models/Response/TransactionResponse';
import { HttpClientResponse } from '../src/Models/Response/HttpClientResponse';
import { uniqid } from '../src/Utils/Functions';
import { creditManagementTestInvoice } from './PaymentMethods/CreditManagment.test';
import IRequest from '../src/Models/IRequest';

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
            const combinedInvoice = creditManagement.manually().createCombinedInvoice(creditManagementTestInvoice());

            const sepaRequest = sepaDirectDebit.manually().combine(combinedInvoice.data).pay({
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
        const transactionService = client.transaction('39F3EC520A3F4A25B0A1899D4FF0E1CB');
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
});
