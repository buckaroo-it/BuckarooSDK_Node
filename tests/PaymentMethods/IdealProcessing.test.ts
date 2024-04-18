import buckarooClientTest from '../BuckarooClient.test';

const idealProcessing = buckarooClientTest.method('idealprocessing');
describe('testing Ideal Processing methods', () => {
    test('Issuers', async () => {
        return idealProcessing.issuers().then((response) => {
            expect(Array.isArray(response)).toBeTruthy();
        });
    });
    test('Pay Simple Payload', async () => {
        return idealProcessing
            .pay({
                amountDebit: 100,
                issuer: 'ABNANL2A',
                continueOnIncomplete: false,
                additionalParameters: {
                    initiated_by_magento: 1,
                    service_action: 'something',
                },
            })
            .request()
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });
});
