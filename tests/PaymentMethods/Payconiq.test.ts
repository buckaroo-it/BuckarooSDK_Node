import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../src';
import buckarooClientTest from '../BuckarooClient';
import { createRefundPayload } from '../Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

let method: PaymentMethodInstance<'payconiq'>;

beforeEach(() => {
    method = buckarooClientTest.method('payconiq');
});

describe('Payconiq', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .pay({
                amountDebit: 100.3,
                order: uniqid(),
            })
            .request();
        expect(response.isPendingProcessing).toBeTruthy();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '93FA5B31D80C489BB0822A3BD8037D6E',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('InstantRefund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .instantRefund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '93FA5B31D80C489BB0822A3BD8037D6E',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
