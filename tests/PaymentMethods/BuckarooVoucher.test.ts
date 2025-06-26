import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest } from '../../src';
import { createRefundPayload } from '../Payloads';

let method = buckarooClientTest.method('buckaroovoucher');
let voucherCode: string;
let transactionKey: string;
const today = new Date();
const oneMonthFromNow = new Date();
oneMonthFromNow.setMonth(today.getMonth() + 1);

const formatDate = (date: Date) => date.toISOString().split('T')[0];

beforeEach(() => {
    method = buckarooClientTest.method('buckaroovoucher');
});

describe('testing methods', () => {
    test('CreateApplication', async () => {
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
        expect(voucherCode).toBeDefined();

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
        const response = await method
            .deactivate({
                voucherCode: voucherCode,
            })
            .request();
        expect(response.httpResponse.status).toEqual(200);
    });
});
