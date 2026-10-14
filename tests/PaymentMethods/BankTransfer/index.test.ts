import { Gender, IRefundRequest, PaymentMethodInstance } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createRefundPayload } from '../../Support/Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'transfer'>;

beforeEach(() => {
    method = buckarooClientTest.method('transfer');
});

describe('Transfer methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(792));

        const response = await method
            .pay({
                amountDebit: 100,
                customer: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                    gender: Gender.MALE,
                },
                email: 'test@buckaroo.nl',
                sendMail: true,
                dateDue: '2024-10-10',
            })
            .request();
        expect(response.isAwaitingConsumer()).toBeTruthy();
    });

    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '0D04AEAEE48E464597831E15BB92FBF1',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
