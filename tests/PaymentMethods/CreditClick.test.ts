import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';

const method = buckarooClientTest.method('creditclick');

describe('Testing CreditClick methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
                person: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                },
                email: 'test@buckaroo.nl',
            })
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                invoice: uniqid(),
                description: 'refund',
                refundReason: 'Fraudulent',
            })
            .request()
            .then((response) => {
                expect(response.isFailed()).toBeTruthy();
            });
    });
});
