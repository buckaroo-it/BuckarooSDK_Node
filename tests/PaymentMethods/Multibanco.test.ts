import buckarooClientTest from '../BuckarooClient.test';

describe('Multibanco methods', () => {
    test('Pay', async () => {
        return buckarooClientTest
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
