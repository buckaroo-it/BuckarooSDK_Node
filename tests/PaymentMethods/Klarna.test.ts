import buckarooClientTest from '../BuckarooClient.test';
import { IPay } from '../../src/PaymentMethods/Klarna/Models/Pay';
import { PaymentMethodInstance } from '../../src';
import { createBasePayload } from '../Payloads';

let method: PaymentMethodInstance<'klarna'>;

beforeEach(() => {
    method = buckarooClientTest.method('klarna');
});

describe('Testing Klarna methods', () => {
    test('Pay', async () => {
        const response = await method.pay(getPayload()).request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('PayInInstallments', async () => {
        const response = await method.payInInstallments(getPayload('GB', 'GBP')).request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('PayReminder', async () => {
        const response = await buckarooClientTest
            .method('boekenbon')
            .pay({
                amountDebit: 10,
                intersolveCardnumber: '0000000000000000001',
                intersolvePIN: '500',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();

        let relatedTransactionKey = response?.data?.relatedTransactions?.[0].relatedTransactionKey || '';
        const responseRemainderPay = await method
            .payRemainder({
                ...getPayload(),
                amountDebit: 5,
                originalTransactionKey: relatedTransactionKey,
            })
            .request();
        expect(responseRemainderPay.isPendingProcessing()).toBeTruthy();
    });
});

function getPayload(country: string = 'NL', currency: string = 'EUR'): IPay {
    const payload = createBasePayload<IPay>(
        { currency: currency },
        {
            billing: {
                exclude: ['state', 'lastNamePrefix', 'placeOfBirth', 'title', 'phone', 'initials', 'culture'],
            },
            shipping: {
                exclude: ['state', 'lastNamePrefix', 'placeOfBirth', 'title', 'phone', 'initials', 'culture'],
            },
            articles: {
                exclude: ['type', 'unitCode', 'vatCategory'],
            },
        }
    );

    if (payload.shipping?.address) {
        payload.shipping.address.country = country;
    }

    if (payload.billing?.address) {
        payload.billing.address.country = country;
    }

    return payload;
}
