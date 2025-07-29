import { IRefundRequest, PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'MBWay'>;

beforeEach(() => {
    method = buckarooClientTest.method('MBWay');
});

describe('Mbway methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 100.3,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'C2D92C20BA244E02AB3CF2DE56E026F1',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
