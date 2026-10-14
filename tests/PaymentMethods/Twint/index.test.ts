import { IRefundRequest, PaymentMethodInstance } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createRefundPayload } from '../../Support/Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'twint'>;

beforeEach(() => {
    method = buckarooClientTest.method('twint');
});

describe('testing methods', () => {
    test('Pay Simple Payload', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .pay({
                amountDebit: 100,
                currency: 'CHF',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });

    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '1B649F2796AA466F8D8AE695XXXXXXXX',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
