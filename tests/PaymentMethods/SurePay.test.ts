import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('surepay');

describe('SurePay methods', () => {
    test('Verify', async () => {
        await method
            .verify({
                amountDebit: 100,
                bankAccount: {
                    iban: 'NLXXTESTXXXXXXXXXX',
                    accountName: 'Test Acceptatie',
                },
            })
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
});
