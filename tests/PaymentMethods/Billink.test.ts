import { IPay } from '../../src/PaymentMethods/Billink/Models/Pay';
import buckarooClientTest from '../BuckarooClient.test';
import { PaymentMethodInstance } from '../../src';
import { createBasePayload, createRefundPayload } from '../Payloads';
import { IRefund } from '../../src/PaymentMethods/Billink/Models/Refund';

let payTransactionKey: string;
let method: PaymentMethodInstance<'billink'>;
let payload: IPay;

beforeEach(() => {
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
        const response = await method.pay(payload).request();

        expect(response.isSuccess()).toBeTruthy();
        payTransactionKey = response.getTransactionKey();
    });
    test('Refund', async () => {
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
