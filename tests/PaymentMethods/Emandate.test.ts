import buckarooClientTest from '../BuckarooClient.test';
import { PaymentMethodInstance, ServiceCode, uniqid } from '../../src';

let method: PaymentMethodInstance<'emandate'>;

beforeEach(() => {
    method = buckarooClientTest.method('emandate');
});

describe('Testing Emandates methods', () => {
    test('GetIssuerList', async () => {
        const response = await method.issuerList().request();
        expect(response.isSuccess()).toBeTruthy();
    });

    test('CreateMandate', async () => {
        const response = await method
            .createMandate({
                emandatereason: 'Testing',
                sequenceType: 0,
                purchaseId: uniqid(),
                debtorbankid: 'INGBNL2A',
                debtorReference: 'reference',
                language: 'nl',
                continueOnIncomplete: true,
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });

    test('GetStatus', async () => {
        const response = await method.status({ mandateId: '1DC1803BA695F0747AD819C62A557BC6149' }).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('ModifyMandate', async () => {
        const response = await method
            .modifyMandate({
                originalMandateId: '1DC1803BA695F0747AD819C62A557BC6149',
                continueOnIncomplete: true,
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });
    test.only('CancelMandate', async () => {
        const response = await method
            .setServiceCode('emandateb2b' as ServiceCode)
            .cancelMandate({
                mandateId: '1DCFCAE452C96D7474BB28C57068134C02F',
                purchaseId: '6383d3e86944a0',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
});
