import { IRefundRequest, PaymentMethodInstance } from '../../src';
import { IPay } from '../../src/PaymentMethods/In3/Models/Pay';
import buckarooClientTest from '../BuckarooClient';
import { createBasePayload, createRefundPayload } from '../Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

let method: PaymentMethodInstance<'in3'>;

const payload = createBasePayload<IPay>(
    {},
    {
        billing: {
            exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth', 'title'],
        },
        shipping: {
            exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth', 'title'],
        },
        articles: {
            exclude: ['unitCode', 'vatCategory'],
        },
    }
);

beforeEach(() => {
    method = buckarooClientTest.method('in3');
});
describe('Testing In3 methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(791));

        const response = await method.pay(payload).request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Pay with ABN-AMRO', async () => {
        mockResponse(transactionResponse(791));

        const response = await method.pay({ ...payload, route: 'abn_b2b' }).request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Authorize with ABN-AMRO', async () => {
        mockResponse(transactionResponse(791));

        const response = await method.authorize({ ...payload, route: 'abn_b2b' }).request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Capture with ABN-AMRO', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .capture({ ...payload, route: 'abn_b2b', originalTransactionKey: '4BC466160ACB460EAFB8923D1BBFE33A' })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '4BC466160ACB460EAFB8923D1BBFE33A',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
