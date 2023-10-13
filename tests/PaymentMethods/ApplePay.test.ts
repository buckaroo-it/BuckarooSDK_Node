import { uniqid } from '../../src/Utils/Functions';

require('../BuckarooClient.test');
import ApplePay from '../../src/PaymentMethods/ApplePay';

const method = new ApplePay();

describe('Applepay methods', () => {
    test('Pay Simple Payload', async () => {
        await method
            .pay({
                amountDebit: 10,
                paymentData: 'sad',
                customerCardName: '87y7y8',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Pay Redirect Payload', async () => {
        await method
            .payRedirect({
                amountDebit: 10,
                invoice: uniqid(),
                servicesSelectableByClient: 'applepay',
                continueOnIncomplete: true,
            })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 5,
                originalTransactionKey: 'F397DA6A251645F8BDD81547B5005B4B',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Specifications', async () => {
        await method
            .specification()
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});
