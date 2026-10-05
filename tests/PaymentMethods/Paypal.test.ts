import { IRefundRequest, PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient';
import { createRefundPayload } from '../Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

let method: PaymentMethodInstance<'paypal'>;

beforeEach(() => {
    method = buckarooClientTest.method('paypal');
});
describe('Paypal', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .pay({
                amountDebit: 100.3,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'EAD916B7D6544568A02B40B88F9207F6',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('ExtraInfo', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .extraInfo({
                amountDebit: 100.3,
                address: {
                    street: 'Hoofdstraat',
                    street2: 'Street 2',
                    city: 'Heerenveen',
                    state: 'Friesland',
                    zipcode: '8441ER',
                    country: 'NL',
                },
                addressOverride: false,
                customer: { name: 'Test Acceptatie' },
                noShipping: '0',
                phone: { mobile: '0612345678' },
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});

test('payRecurrent builds the PayRecurring request', async () => {
    mockResponse(transactionResponse(), '/json/Transaction');
    const result = await method.payRecurrent({ amountDebit: 10, originalTransactionKey: 'test-original' }).request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'PayRecurring' })]),
                },
            }),
        }),
    ]);
});
