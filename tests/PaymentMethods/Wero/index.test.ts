import { PaymentMethodInstance, uniqid } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'wero'>;

beforeEach(() => {
    method = buckarooClientTest.method('wero');
});

describe('Wero methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .pay({
                amountDebit: 10,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund({
                amountCredit: 10,
                invoice: uniqid(),
                originalTransactionKey: 'C0D904513E2D40FC826C9C76XXXXXXXX',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Authorize', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .authorize({
                amountDebit: 10,
                invoice: uniqid(),
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('CancelAuthorize', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .cancelAuthorize({
                originalTransactionKey: 'C0D904513E2D40FC826C9C76XXXXXXXX',
                amountCredit: 10,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Capture', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .capture({
                originalTransactionKey: 'C0D904513E2D40FC826C9C76XXXXXXXX',
                amountDebit: 10,
                description: 'Test Capture Transaction',
                invoice: uniqid(),
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
