require('../BuckarooClient.test');
import PiM from '../../src/PaymentMethods/PiM';

const pim = new PiM();

describe('PiM', () => {
    test('generate', async () => {
        await pim.generate().then((info) => {
            expect(info).toBeDefined();
        });
    });
});
