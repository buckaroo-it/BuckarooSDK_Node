import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('pospayment');

describe('POS methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 100,
                invoice: uniqid(),
                terminalId: '50000001',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
