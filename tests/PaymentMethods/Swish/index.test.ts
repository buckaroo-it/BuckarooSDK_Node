import { IRefundRequest, PaymentMethodInstance } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createRefundPayload } from '../../Support/Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'swish'>;

beforeEach(() => {
    method = buckarooClientTest.method('swish');
});

describe('Swish methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .pay({
                currency: 'SEK',
                amountDebit: 10,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    currency: 'SEK',
                    originalTransactionKey: '571519D5237B40D884B6D95245ED953B',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
