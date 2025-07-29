import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('ClickToPay');
describe('Testing ClickToPay methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 0.01,
                continueOnIncomplete: true,
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });
});

