import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../src';
import buckarooClientTest from '../BuckarooClient';
import { createRefundPayload } from '../Payloads';
import { issuerResponse, mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

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
