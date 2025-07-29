import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'ideal'>;

beforeEach(() => {
    method = buckarooClientTest.method('ideal');
});
describe('testing Ideal methods', () => {
    test('Issuers', async () => {
        const response = await method.issuers();
        expect(Array.isArray(response)).toBeTruthy();
    });
    test('Pay Simple Payload', async () => {
        const response = await method
            .pay({
                amountDebit: 100,
                issuer: 'ABNANL2A',
                continueOnIncomplete: false,
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'D2FCFA2133F5412A8D6D376D2BFEF573',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('InstantRefund', async () => {
        const response = await method
            .instantRefund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'D2FCFA2133F5412A8D6D376D2BFEF573',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('PayFastCheckout', async () => {
        const response = await method
            .payFastCheckout({
                invoice: uniqid(),
                currency: 'EUR',
                amountDebit: 10,
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });
    test('Pay Reminder', async () => {
        const response = await buckarooClientTest
            .method('boekenbon')
            .pay({
                amountDebit: 10,
                intersolveCardnumber: '0000000000000000001',
                intersolvePIN: '500',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();

        let relatedTransactionKey = response?.data?.relatedTransactions?.[0].relatedTransactionKey || '';
        const responseRemainderPay = await method
            .payRemainder({
                amountDebit: 5,
                originalTransactionKey: relatedTransactionKey,
                issuer: 'ABNANL2A',
            })
            .request();
        expect(responseRemainderPay.isWaitingOnUserInput()).toBeTruthy();
    });
});

