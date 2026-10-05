import { IRefundRequest, PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient';
import { createRefundPayload } from '../Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

let method: PaymentMethodInstance<'alipay'>;

beforeEach(() => {
    method = buckarooClientTest.method('alipay');
});

describe('Alipay methods', () => {
    test('Pay Simple Payload', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .pay({
                amountDebit: 100,
                useMobileView: false,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '6CE35062C16C4F47A49314D533E9F7A3',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
