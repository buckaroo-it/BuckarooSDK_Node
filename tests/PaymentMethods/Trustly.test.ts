import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('trustly');

describe('Trustly', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
                customer: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                    countryCode: 'NL',
                },
            })
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy();
            });
    });
});
