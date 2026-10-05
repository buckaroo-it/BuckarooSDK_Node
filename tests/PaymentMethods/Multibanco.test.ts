import { IRefundRequest, PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient';
import { createRefundPayload } from '../Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

let method: PaymentMethodInstance<'multibanco'>;

beforeEach(() => {
    method = buckarooClientTest.method('multibanco');
});

describe('Multibanco methods', () => {
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
                    originalTransactionKey: '3BEB1B96CE7E4ECBB68EE44BDDE7FD6F',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
