import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance, RecipientCategory } from '../../src';
import { createAddressPayload, createBasePayload, createCustomerPayload, createRefundPayload } from '../Payloads';
import { IPay } from '../../src/PaymentMethods/In3Old/Models/Pay';

let method: PaymentMethodInstance<'capayable'>;
const payload = createBasePayload<IPay>(
    {
        customerType: RecipientCategory.COMPANY,
        invoiceDate: '22-01-2018',
        email: 'test@buckaroo.nl',
        phone: {
            mobile: '0612345678',
        },
        company: {
            companyName: 'Company B.V.',
            chamberOfCommerce: '123456',
        },
        ...createAddressPayload({}, ['houseNumberAdditional']),
        ...createCustomerPayload({}, ['firstName']),
    },
    {
        billing: {
            exclude: ['state', 'gender', 'lastNamePrefix', 'placeOfBirth', 'title'],
        },
        shipping: {
            exclude: ['state', 'gender', 'lastNamePrefix', 'placeOfBirth', 'title'],
        },
        articles: {
            exclude: ['type', 'unitCode', 'vatCategory', 'vatPercentage'],
        },
    }
);

beforeEach(() => {
    method = buckarooClientTest.method('capayable');
});

describe('Testing capayable methods', () => {
    test('PayInInstallments', async () => {
        const response = await method.payInInstallments(payload).request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'EF24A62B8D7B4F88859FBA4DF140B6C2',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
