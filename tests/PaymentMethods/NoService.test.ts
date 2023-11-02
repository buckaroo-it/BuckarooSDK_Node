import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('noservice');

describe('NoService methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
                invoice: uniqid(),
                servicesSelectableByClient: 'ideal,bancontactmrcash,paypal',
                servicesExcludedForClient: 'ideal',
                continueOnIncomplete: true,
            })
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });
});