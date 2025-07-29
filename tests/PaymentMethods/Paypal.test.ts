import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../src';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'paypal'>;

beforeEach(() => {
    method = buckarooClientTest.method('paypal');
});
describe('Paypal', () => {
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
                    originalTransactionKey: 'EAD916B7D6544568A02B40B88F9207F6',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('ExtraInfo', async () => {
        const response = await method
            .extraInfo({
                amountDebit: 100.3,
                address: {
                    street: 'Hoofdstraat',
                    street2: 'Street 2',
                    city: 'Heerenveen',
                    state: 'Friesland',
                    zipcode: '8441ER',
                    country: 'NL',
                },
                addressOverride: false,
                customer: { name: 'Test Acceptatie' },
                noShipping: '0',
                phone: { mobile: '0612345678' },
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
});
