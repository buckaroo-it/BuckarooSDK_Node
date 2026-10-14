import { PaymentMethodInstance } from '../../../src';
import { IPay } from '../../../src/PaymentMethods/Afterpay/Model/Pay';
import { IRefund } from '../../../src/PaymentMethods/Afterpay/Model/Refund';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createBasePayload, createRefundPayload } from '../../Support/Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'afterpay'>;
let payload: IPay;

beforeEach(() => {
    method = buckarooClientTest.method('afterpay');
    payload = createBasePayload<IPay>(
        {},
        {
            billing: {
                exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth', 'initials', 'title'],
            },
            shipping: {
                exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth', 'initials', 'title'],
            },
            articles: {
                exclude: ['type', 'unitCode', 'vatCategory'],
            },
        }
    );
});

describe('AfterPay methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(190));

        const response = await method.pay(payload).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Pay with Different Version', async () => {
        mockResponse(transactionResponse(190));

        const response = await method.setServiceVersion(2).pay(payload).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefund>({
                    originalTransactionKey: '4D2D8ABD5EA14E908F855BC7A8B10735',
                    amountCredit: payload.amountDebit,
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Authorize', async () => {
        mockResponse(transactionResponse(190));

        const response = await method.authorize(payload).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('CancelAuthorize', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .cancelAuthorize(
                createRefundPayload<IRefund>({
                    originalTransactionKey: '9CFEFC57074247DE92F7804246D1DD5D',
                    amountCredit: payload.amountDebit,
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Capture', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .capture({
                ...payload,
                originalTransactionKey: 'CD1493C19B69488CB88EC6576DD1E928',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});

test('payRemainder builds the PayRemainder request', async () => {
    mockResponse(transactionResponse(), '/json/Transaction');
    const result = await method.payRemainder(payload).request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'PayRemainder' })]),
                },
            }),
        }),
    ]);
});

test('authorizeRemainder builds the AuthorizeRemainder request', async () => {
    mockResponse(transactionResponse(), '/json/Transaction');
    const result = await method.authorizeRemainder(payload).request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'AuthorizeRemainder' })]),
                },
            }),
        }),
    ]);
});
