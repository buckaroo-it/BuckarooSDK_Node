require('../BuckarooClient.test');
import Trustly from '../../src/PaymentMethods/Trustly';

const method = new Trustly();

describe('Trustly', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 12,
                customerCountryCode: 'DE',
                customerFirstName: 'da',
                customerLastName: '34',
            })
            .then((response) => {
                expect(response).toBeDefined();
            });
    });
});
