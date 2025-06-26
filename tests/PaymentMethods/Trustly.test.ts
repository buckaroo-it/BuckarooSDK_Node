import { IRefundRequest, PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'trustly'>;

beforeEach(() => {
    method = buckarooClientTest.method('trustly');
});

describe('Trustly', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                continueOnIncomplete: true,
                amountDebit: 100,
                customer: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                    countryCode: 'NL',
                    email: 'test@buckaroo.nl',
                },
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });
    test('Pay', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'D1A57C57FAF5430D9F98B33D871D15C0',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
