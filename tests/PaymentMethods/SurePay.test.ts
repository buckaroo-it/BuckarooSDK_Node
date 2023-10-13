require('../BuckarooClient.test');
import SurePay from '../../src/PaymentMethods/Surepay';

const method = new SurePay();

describe('Sofort', () => {
    test('Verify', async () => {
        await method
            .verify({
                customeraccountname: 'string',
            })
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
});
