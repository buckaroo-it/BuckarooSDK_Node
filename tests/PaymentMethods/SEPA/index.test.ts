import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../../src';
import { IPay } from '../../../src/PaymentMethods/SEPA/Models/Pay';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createRefundPayload } from '../../Support/Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'sepadirectdebit'>;

beforeEach(() => {
    method = buckarooClientTest.method('sepadirectdebit');
});

const paymentPayload: IPay = {
    invoice: uniqid(),
    amountDebit: 100.3,
    iban: 'NL13TEST0123456789',
    bic: 'TESTNL2A',
    startRecurrent: true,
    collectdate: '2022-12-01',
    mandateReference: '1DCtestreference',
    mandateDate: '2022-07-03',
    customer: {
        name: 'Test Acceptatie',
    },
};

describe('SEPA methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(791));

        const response = await method.pay(paymentPayload).request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Authorize', async () => {
        mockResponse(transactionResponse(190));

        const response = await method.authorize(paymentPayload).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('PayRecurrent', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .payRecurrent({
                invoice: uniqid(),
                amountDebit: 10,
                originalTransactionKey: '636BC4E3540D4B3DA1962B5BA0F680E9',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '636BC4E3540D4B3DA1962B5BA0F680E9',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('ExtraInfo', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .extraInfo({
                amountDebit: 100,
                invoice: uniqid(),
                iban: 'NL13TEST0123456789',
                bic: 'TESTNL2A',
                contractID: 'Test',
                mandateDate: '2022-07-03',
                customerReferencePartyName: 'Test',
                customer: {
                    name: 'Test Acceptatie',
                },
                address: {
                    street: 'Hoofdstraat',
                    houseNumber: '80',
                    houseNumberAdditional: 'a',
                    zipcode: '8441ER',
                    city: 'Heerenveen',
                    country: 'NL',
                },
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Emandates', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .payWithEmandate({
                order: '',
                invoice: uniqid(),
                mandateReference: '1DC326734AB3084FC7',
                amountDebit: 100.3,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
