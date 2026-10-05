import { IRefundRequest, PaymentMethodInstance } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createRefundPayload } from '../../Support/Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'externalpayment'>;
let transactionKey = 'test-transactionKey';

beforeEach(() => {
    transactionKey = 'test-transactionKey';
    method = buckarooClientTest.method('externalpayment');
});
describe('Testing ExternalPayment methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .pay({
                amountDebit: 10,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
        transactionKey = response.getTransactionKey();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        expect(transactionKey).toBeDefined();
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: transactionKey,
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});

test('sets the point-of-sale channel on external payments', async () => {
    mockResponse(transactionResponse());
    await method.setChannel('POINT-OF-SALE').pay({ amountDebit: 10 }).request();
    expect(recordedRequests()).toEqual([expect.objectContaining({ channel: 'POINT-OF-SALE' })]);
});
