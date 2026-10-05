import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createRefundPayload } from '../../Support/Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'bancontactmrcash'>;
let transactionKey = 'test-transactionKey';

beforeEach(() => {
    transactionKey = 'test-transactionKey';
    method = buckarooClientTest.method('bancontactmrcash');
});

describe('Bancontact methods', () => {
    test('Pay Simple Payload', async () => {
        mockResponse(transactionResponse(790));

        const response = await method
            .pay({
                amountDebit: 100,
                saveToken: true,
            })
            .request();

        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });

    test('PayOneClick', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .payOneClick({
                invoice: uniqid(),
                originalTransactionKey: 'FB45BE56A0584613A15DD5A453AC145F',
                amountDebit: 100,
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
        transactionKey = response.getTransactionKey();
    });

    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        expect(transactionKey).toBeDefined();

        const refundPayload = createRefundPayload<IRefundRequest>({
            originalTransactionKey: transactionKey,
        });

        const response = await method.refund(refundPayload).request();
        expect(response.isSuccess()).toBeTruthy();
    });

    test('Authenticate', async () => {
        mockResponse(transactionResponse(790));

        const response = await method
            .authenticate({
                invoice: uniqid(),
                amountDebit: 100,
            })
            .request();

        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });

    test('PayEncrypted', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .payEncrypted({
                invoice: uniqid(),
                amountDebit: 100,
                encryptedCardData:
                    '001SlXfd8MbiTd/JFwCiGVs3f6o4x6xt0aN29NzOSNZHPKlVsz/EWeQmyhb1gGZ86VY88DP7gfDV+UyjcPfpVfHZd7u+WkO71hnV2QfYILCBNqE1aiPv2GQVGdaGbuoQloKu1o3o3I1UDmVxivXTMQX76ovot89geA6hqbtakmpmvxeiwwea3l4htNoX1IlD1hfYkDDl9rzSu5ypcjvVs6aRGXK5iMHnyrmEsEnfdj/Q5XWbsD5xAm4u3y6J8d4UP7LB31VLECzZUTiJOtKKcCQlT01YThIkQlj8PWBBMtt4H52VN3IH2+wPYtR8HiOZzcA2HA7UxozogIpS53tIURj/g==',
            })
            .request();

        expect(response.isPendingProcessing()).toBeTruthy();
        transactionKey = response.getTransactionKey();
    });

    test('CompletePayment', async () => {
        mockResponse(transactionResponse(791), '/json/DataRequest');

        expect(transactionKey).toBeDefined();

        const response = await method
            .completePayment({
                originalTransactionKey: transactionKey,
                encryptedCardData:
                    '001SlXfd8MbiTd/JFwCiGVs3f6o4x6xt0aN29NzOSNZHPKlVsz/EWeQmyhb1gGZ86VY88DP7gfDV+UyjcPfpVfHZd7u+WkO71hnV2QfYILCBNqE1aiPv2GQVGdaGbuoQloKu1o3o3I1UDmVxivXTMQX76ovot89geA6hqbtakmpmvxeiwwea3l4htNoX1IlD1hfYkDDl9rzSu5ypcjvVs6aRGXK5iMHnyrmEsEnfdj/Q5XWbsD5xAm4u3y6J8d4UP7LB31VLECzZUTiJOtKKcCQlT01YThIkQlj8PWBBMtt4H52VN3IH2+wPYtR8HiOZzcA2HA7UxozogIpS53tIURj/g==',
            })
            .request();

        expect(response.isPendingProcessing()).toBeTruthy();
    });

    test('PayRecurring', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .payRecurring({
                invoice: uniqid(),
                amountDebit: 100,
                originalTransactionKey: transactionKey,
            })
            .request();

        expect(response.httpResponse.status).toEqual(200);
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
