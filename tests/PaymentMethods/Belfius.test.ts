import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest } from '../../src';
import { createRefundPayload } from '../Payloads';

let method = buckarooClientTest.method('belfius');

beforeEach(() => {
    method = buckarooClientTest.method('belfius');
});

describe('testing methods', () => {
    test('Pay Simple Payload', async () => {
        const response = await method
            .pay({
                amountDebit: 100,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });

    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '1B649F2796AA466F8D8AE695170CAC85',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
