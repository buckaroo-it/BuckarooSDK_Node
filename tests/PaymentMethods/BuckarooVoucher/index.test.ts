import { IRefundRequest, PaymentMethodInstance } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createRefundPayload } from '../../Support/Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'buckaroovoucher'>;

let voucherCode = 'test-voucherCode';
let transactionKey = 'test-transactionKey';

const formatDate = (date: Date) => date.toISOString().split('T')[0];

beforeEach(() => {
    voucherCode = 'test-voucherCode';
    transactionKey = 'test-transactionKey';
    method = buckarooClientTest.method('buckaroovoucher');
});

describe('testing methods', () => {
    test('CreateApplication', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const today = new Date();
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(today.getMonth() + 1);

        const response = await method
            .create({
                creationBalance: 12,
                usageType: 1,
                validFrom: formatDate(today),
                validUntil: formatDate(oneMonthFromNow),
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();

        voucherCode = String(response.getServices()?.[0]?.parameters.find((p) => p.name === 'VoucherCode')?.value);
    });
    test('GetBalance', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        return method
            .getBalance({
                voucherCode: voucherCode,
            })
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Pay', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .pay({
                amountDebit: 1,
                voucherCode: voucherCode,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
        transactionKey = response.getTransactionKey();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        expect(transactionKey).toBeDefined();

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: transactionKey,
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('DeactivateVoucher', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method
            .deactivate({
                voucherCode: voucherCode,
            })
            .request();
        expect(response.httpResponse.status).toEqual(200);
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
