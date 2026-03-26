import { PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';

let method: PaymentMethodInstance<'banking'>;

beforeEach(() => {
    method = buckarooClientTest.method('banking');
});

describe('Banking methods', () => {
    test('PaymentOrder with all optional parameters', async () => {
        const response = await method
            .paymentOrder({
                amountCredit: 150.0,
                invoice: `Banking_Test_${Date.now()}`,
                description: 'Banking PaymentOrder Test',
                accountHolderName: 'John Doe',
                iban: 'NL44RABO0123456789',
                processingDate: '12/12/2026',
                bic: 'PAYMINBBXXX',
                purpose: 'Testing',
                structuredIssuerType: 'ISO',
                structuredReference: 'RF18539007547034',
            })
            .request();
        expect(response.isPendingApproval()).toBeTruthy();
    });

    test('PaymentOrder with minimal parameters', async () => {
        const response = await method
            .paymentOrder({
                amountCredit: 100.0,
                invoice: `Banking_Minimal_Test_${Date.now()}`,
                description: 'Banking PaymentOrder Minimal Test',
                accountHolderName: 'John Doe',
                iban: 'NL44RABO0123456789',
            })
            .request();
        expect(response.isPendingApproval()).toBeTruthy();
    });

    test('InstantPaymentOrder', async () => {
        const response = await method
            .instantPaymentOrder({
                amountCredit: 75.0,
                invoice: `Banking_Instant_Test_${Date.now()}`,
                description: 'Banking InstantPaymentOrder Test',
                accountHolderName: 'John Doe',
                iban: 'NL44RABO0123456789',
            })
            .request();
        expect(response.isPendingApproval()).toBeTruthy();
    });
});