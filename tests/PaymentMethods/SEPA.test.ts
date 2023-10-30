import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';
import { IPay } from '../../src/PaymentMethods/SEPA/Models/Pay';

const method = buckarooClientTest.method('sepadirectdebit');

const paymentPayload: IPay = {
    invoice: uniqid(),
    amountDebit: 100,
    iban: 'NLXXTESTXXXXXXXXXX',
    bic: 'XXXXXXXXX',
    collectdate: '2022-12-01',
    mandateReference: 'XXXXXXXXXXXXXXX',
    mandateDate: '2022-07-03',
    customer: {
        name: 'Test Acceptatie',
    },
};

describe('SEPA methods', () => {
    test('Pay', async () => {
        await method
            .pay(paymentPayload)
            .request()
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
    test('Authorize', async () => {
        await method
            .authorize(paymentPayload)
            .request()
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
    test('PayRecurrent', async () => {
        await method
            .payRecurrent({
                invoice: uniqid(),
                collectDate: '2030-07-03',
                amountDebit: 100,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
    test('ExtraInfo', async () => {
        await method
            .extraInfo({
                amountDebit: 100,
                invoice: uniqid(),
                iban: 'NLXXTESTXXXXXXXXXX',
                bic: 'XXXXXXXXX',
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
            .request()
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
    test('Emandates', async () => {
        await method
            .payWithEmandate({
                order: uniqid(),
                invoice: uniqid(),
                mandateReference: 'XXXXXXXXXXXXXXX',
                amountDebit: 100,
            })
            .request()
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
});
