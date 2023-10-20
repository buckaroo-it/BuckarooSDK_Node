require('../BuckarooClient.test');
import Trustly from '../../src/PaymentMethods/Trustly';

const method = new Trustly();

describe('Trustly', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 12,
                customer: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                    country: 'NL',
                },
            })
            .request()
            .then((response) => {
                expect(response).toBeDefined();
            });
    });
});
