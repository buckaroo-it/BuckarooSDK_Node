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
            creditManagement.createCombinedInvoice(creditManagementTestInvoice());

            sepaDirectDebit.combine(creditManagement).pay({
                invoice: uniqid(),
                amountDebit: 10.1,
                iban: 'NL13TEST0123456789',
                bic: 'TESTNL2A',
                collectdate: '2024-07-03',
                mandateReference: '1DCtestreference',
                mandateDate: '2022-07-03',
                customer: {
                    name: 'John Smith',
                },
            });
            transactionData.push(sepaDirectDebit.getPayload());
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
