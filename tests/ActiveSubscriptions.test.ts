import client from './BuckarooClient.test';

describe('Testing Buckaroo Client', () => {
    test('Get active subscriptions', async () => {
        await client.getActiveSubscriptions().then((response) => {
            expect(response).toBeDefined();
        });
    });
})