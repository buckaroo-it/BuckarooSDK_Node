import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('idin');

describe('Idin methods', () => {
    test('Verify', async () => {
        await method
            .verify({
                issuer: 'BANKNL2Y',
            })
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });

    test('Identify', async () => {
        await method
            .identify({
                issuer: 'BANKNL2Y',
            })
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });

    test('Login', async () => {
        await method
            .login({
                issuer: 'BANKNL2Y',
            })
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });
});