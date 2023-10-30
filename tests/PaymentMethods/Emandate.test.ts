import buckarooClientTest from '../BuckarooClient.test';
import { ServiceCode } from '../../src';

const method = buckarooClientTest.method('emandate');
describe('Testing Emandates methods', () => {
    test('GetIssuerList', async () => {
        await method.issuerList().then((response) => {
            expect(response.isSuccess()).toBeTruthy();
        });
    });
    test('CreateMandate', async () => {
        method
            .createMandate({
                debtorReference: 'XXXXXXXXX',
                language: 'nl',
                continueOnIncomplete: true,
                purchaseId: 'XXXXXXXXXXXXXX',
                sequenceType: 0,
            })
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy();
            });
    });
    test('GetStatus', async () => {
        method.status({ mandateId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' }).then((response) => {
            expect(response.isSuccess()).toBeTruthy();
        });
    });
    test('ModifyMandate', async () => {
        method
            .modifyMandate({
                originalMandateId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                continueOnIncomplete: true,
            })
            .then((response) => {
                expect(response.isFailed()).toBeTruthy();
            });
    });
    test('CancelMandate', async () => {
        method
            .setServiceCode('emandateb2b' as ServiceCode)
            .cancelMandate({
                mandateId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                purchaseId: 'XXXXXXXXXXXXXX',
            })
            .then((response) => {
                expect(response.isValidationFailure()).toBeTruthy();
            });
    });
});
