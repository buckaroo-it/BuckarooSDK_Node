import { PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';

let method: PaymentMethodInstance<'idin'>;

beforeEach(() => {
    method = buckarooClientTest.method('idin');
});

describe('Idin methods', () => {
    test('Verify', async () => {
        const response = await method
            .verify({
                issuer: 'BANKNL2Y',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });

    test('Identify', async () => {
        const response = await method
            .identify({
                issuer: 'BANKNL2Y',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });

    test('Login', async () => {
        const response = await method
            .login({
                issuer: 'BANKNL2Y',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
});
