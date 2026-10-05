import { IRefundRequest, PaymentMethodInstance } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createRefundPayload } from '../../Support/Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'trustly'>;

beforeEach(() => {
    method = buckarooClientTest.method('trustly');
});

describe('Trustly', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(790));

        const response = await method
            .pay({
                continueOnIncomplete: true,
                amountDebit: 100,
                customer: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                    countryCode: 'NL',
                    email: 'test@buckaroo.nl',
                },
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });
    test('Pay', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'D1A57C57FAF5430D9F98B33D871D15C0',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
