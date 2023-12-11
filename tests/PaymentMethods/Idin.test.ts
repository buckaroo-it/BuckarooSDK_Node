import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('idin');

describe('Idin methods', () => {
    test('Verify', async () => {
        return method
            .verify({
                issuer: 'BANKNL2Y',
            })
            .request()
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });

    test('Identify', async () => {
        return method
            .identify({
                issuer: 'BANKNL2Y',
            })
            .request()
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });

    test('Login', async () => {
        return method
            .login({
                issuer: 'BANKNL2Y',
            })
            .request()
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });
});
