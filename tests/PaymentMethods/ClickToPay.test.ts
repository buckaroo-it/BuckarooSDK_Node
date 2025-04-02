import { getIPAddress } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('ClickToPay');
describe('Testing ClickToPay methods', () => {
    test('Pay', async () => {
        return method
            .pay({
                amountDebit: 0.01,
                continueOnIncomplete: true,
            })
            .request()
            .then((response) => {
                expect(response.isWaitingOnUserInput()).toBeTruthy();
            });
    });
});
