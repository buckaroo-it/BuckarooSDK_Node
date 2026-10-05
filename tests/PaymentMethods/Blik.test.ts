import { IRefundRequest, PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient';
import { createRefundPayload } from '../Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

let method: PaymentMethodInstance<'blik'>;

beforeEach(() => {
    method = buckarooClientTest.method('blik');
});

describe('Testing Blik methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .pay({
                currency: 'PLN',
                amountDebit: 100.0,
                invoice: 'Blik Test Plugin Example',
                description: 'Blik Test Plugin Example',
                email: 'test@buckaroo.nl',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'DA18F7031E3547E898B68773E372ACB4',
                    currency: 'PLN',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
