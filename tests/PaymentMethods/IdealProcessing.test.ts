import { PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';

let method: PaymentMethodInstance<'idealprocessing'>;

beforeEach(() => {
    method = buckarooClientTest.method('idealprocessing');
});
describe('testing Ideal Processing methods', () => {
    test('Issuers', async () => {
        return method.issuers().then((response) => {
            expect(Array.isArray(response)).toBeTruthy();
        });
    });
    test('Pay Simple Payload', async () => {
        const response = await method
            .pay({
                amountDebit: 100,
                issuer: 'ABNANL2A',
                continueOnIncomplete: false,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
});
