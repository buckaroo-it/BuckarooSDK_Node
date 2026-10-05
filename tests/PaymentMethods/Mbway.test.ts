import { IRefundRequest, PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient';
import { createRefundPayload } from '../Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

let method: PaymentMethodInstance<'mbway'>;

beforeEach(() => {
    method = buckarooClientTest.method('mbway');
});

describe('Mbway methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .pay({
                amountDebit: 100.3,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'C2D92C20BA244E02AB3CF2DE56E026F1',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
