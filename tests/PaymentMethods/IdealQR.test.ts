import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('idealqr');
describe('Testing IdealQR methods', () => {
    test('Pay', async () => {
        return method
            .generate({
                description: 'Test purchase',
                returnURL: 'https://buckaroo.dev/return',
                returnURLCancel: 'https://buckaroo.dev/cancel',
                returnURLError: 'https://buckaroo.dev/error',
                returnURLReject: 'https://buckaroo.dev/reject',
                minAmount: 0.1,
                maxAmount: 10.0,
                imageSize: 2000,
                purchaseId: 'Testpurchase123',
                isOneOff: false,
                amount: 1.0,
                amountIsChangeable: true,
                expiration: '2030-09-30',
                isProcessing: false,
                additionalParameters: {
                    initiated_by_magento: '1',
                    service_action: 'something',
                },
            })
            .request()
            .then((response) => {
                expect(response.isSuccess()).toBeTruthy();
            });
    });
});
