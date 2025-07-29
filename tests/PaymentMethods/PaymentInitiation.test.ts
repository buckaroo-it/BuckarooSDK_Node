import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../src';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'PayByBank'>;

beforeEach(() => {
    method = buckarooClientTest.method('PayByBank');
});

describe('PaymentInitiation methods', () => {
    test('Issuers', async () => {
        await method.issuers().then((response) => {
            expect(Array.isArray(response)).toBeTruthy();
        });
    });
    test('Pay', async () => {
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
