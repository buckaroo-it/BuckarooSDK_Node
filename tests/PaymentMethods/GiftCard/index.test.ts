import { PaymentMethodInstance, uniqid } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'boekenbon'>;
let transactionKey = 'test-transactionKey';

beforeEach(() => {
    transactionKey = 'test-transactionKey';
    method = buckarooClientTest.method('boekenbon');
});
describe('GiftCard methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .pay({
                amountDebit: 10,
                intersolveCardnumber: '0000000000000000001',
                intersolvePIN: '1000',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
        transactionKey = response.getTransactionKey();
    });

    test('Pay Reminder', async () => {
        mockResponse(transactionResponse(190));
        mockResponse(transactionResponse(190));

        const response = await method
            .pay({
                amountDebit: 50,
                intersolveCardnumber: '0000000000000000001',
                intersolvePIN: '1000',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();

        let relatedTransactionKey = response?.data?.relatedTransactions?.[0].relatedTransactionKey || '';
        const responseRemainderPay = await method
            .payRemainder({
                amountDebit: 40,
                intersolveCardnumber: '0000000000000000001',
                intersolvePIN: '1000',
                originalTransactionKey: relatedTransactionKey,
            })
            .request();
        expect(responseRemainderPay.isSuccess()).toBeTruthy();
    });

    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        expect(transactionKey).toBeDefined();
        const response = await method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: transactionKey,
                email: 'test@buckaroo.nl',
                lastName: 'Acceptatie',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
