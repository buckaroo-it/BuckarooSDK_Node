import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance } from '../../src';
import { IPay } from '../../src/PaymentMethods/In3/Models/Pay';
import { createRefundPayload, createBasePayload } from '../Payloads';

let method: PaymentMethodInstance<'In3'>;

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
    method = buckarooClientTest.method('In3');
});
describe('Testing In3 methods', () => {
    test('Pay', async () => {
        const response = await method.pay(payload).request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
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
