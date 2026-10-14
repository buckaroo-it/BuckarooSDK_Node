import { PaymentMethodInstance } from '../../../src';
import { IPay } from '../../../src/PaymentMethods/Billink/Models/Pay';
import { IRefund } from '../../../src/PaymentMethods/Billink/Models/Refund';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createBasePayload, createRefundPayload } from '../../Support/Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let payTransactionKey = 'test-payTransactionKey';
let method: PaymentMethodInstance<'billink'>;
let payload: IPay;

beforeEach(() => {
    payTransactionKey = 'test-payTransactionKey';
    method = buckarooClientTest.method('billink');
    payload = createBasePayload<IPay>(
        {
            trackandtrace: 'ABC123',
            VATNumber: 'NLXXXXXXXXXXB01',
        },
        {
            billing: {
                exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth'],
            },
            shipping: {
                exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth'],
            },
            articles: {
                exclude: ['type', 'unitCode', 'vatCategory'],
            },
        }
    );
});

describe('Billink methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(190));

        const response = await method.pay(payload).request();

        expect(response.isSuccess()).toBeTruthy();
        payTransactionKey = response.getTransactionKey();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        expect(payTransactionKey).toBeDefined();
        const response = await method
            .refund(
                createRefundPayload<IRefund>({
                    originalTransactionKey: payTransactionKey,
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
