import buckarooClientTest from '../BuckarooClient.test';

const blik = buckarooClientTest.method('blik');

describe('Testing Blik methods', () => {
    test('Pay', async () => {
        return blik
            .pay({
                currency: 'PLN',
                amountDebit: 10.00,
                invoice: 'Blik Test Plugin Example',
                description: 'Blik Test Plugin Example',
                email: 'test@buckaroo.nl',
            })
            .request()
            .then((res) => {
                expect(res.isPendingProcessing()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        return blik
            .refund({
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                currency: 'PLN',
                amountCredit: 5.00,
                invoice: 'Refund Blik Test Plugin Example',
                description: 'Refund Blik Test Plugin Example',
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200)
            });
    });
});
