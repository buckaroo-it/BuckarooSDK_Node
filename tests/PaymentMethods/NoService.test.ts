import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('noservice');

describe('NoService methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 100,
                invoice: uniqid(),
                servicesSelectableByClient: 'ideal,bancontactmrcash,paypal',
                servicesExcludedForClient: 'mbway',
                continueOnIncomplete: true,
            })
            .request();
            expect(response.isWaitingOnUserInput()).toBeTruthy();

    });
});
