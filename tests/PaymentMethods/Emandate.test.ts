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
        const response = await method.status({ mandateId: '1DC7F83B7B937864FB39966B0C08A7B86D8' }).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('ModifyMandate', async () => {
        const response = await method
            .modifyMandate({
                originalMandateId: '1DC7F83B7B937864FB39966B0C08A7B86D8',
                continueOnIncomplete: true,
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });
    // Unknown action 'CancelMandate' used on service 'emandate'.
    // No valid subscription found for service 'emandateb2b'.
    // test('CancelMandate', async () => {
    //     const response = await method
    //         .setServiceCode('emandateb2b' as ServiceCode)
    //         .cancelMandate({
    //             mandateId: '1DC7F83B7B937864FB39966B0C08A7B86D8',
    //             purchaseId: '6383d3e86944a0',
    //         })
    //         .request();
    //     expect(response.isSuccess()).toBeTruthy();
    // });
});
