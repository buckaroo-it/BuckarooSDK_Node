import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createRefundPayload } from '../../Support/Payloads';
import { issuerResponse, mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'paybybank'>;

beforeEach(() => {
    method = buckarooClientTest.method('paybybank');
});

describe('PaymentInitiation methods', () => {
    test('Issuers', async () => {
        mockResponse(issuerResponse, '/json/Transaction/Specification/paybybank', 'GET');

        await method.issuers().then((response) => {
            expect(Array.isArray(response)).toBeTruthy();
        });
    });
    test('Pay', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .pay({
                issuer: 'RABONL2U',
                amountDebit: 100.3,
                order: uniqid(),
                invoice: uniqid(),
                countryCode: 'NL',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
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
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
