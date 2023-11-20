import buckarooClientTest from '../BuckarooClient.test';

describe('Multibanco methods', () => {
    test('Pay', async () => {
        await buckarooClientTest
            .method('multibanco')
            .pay({
                amountDebit: 100,
            })
            .request()
            .then((info) => {
                expect(info.isValidationFailure()).toBeTruthy();
            });
    });
});
