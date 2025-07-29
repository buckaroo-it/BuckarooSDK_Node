import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('surepay');

describe('SurePay methods', () => {
    test('Verify', async () => {
        const response = await method
            .verify({
                currency: '',
                amountDebit: 100.3,
                bankAccount: {
                    iban: 'NLXXTESTXXXXXXXXXX',
                    accountName: 'Test Acceptatie',
                },
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
