import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('surepay');

describe('SurePay methods', () => {
    test('Verify', async () => {
        return method
            .verify({
                amountDebit: 100,
                bankAccount: {
                    iban: 'NLXXTESTXXXXXXXXXX',
                    accountName: 'Test Acceptatie',
                },
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200)
            });
    });
});
