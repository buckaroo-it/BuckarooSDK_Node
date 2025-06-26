import { IInvoice } from '../../src/PaymentMethods/CreditManagement/Models/Invoice';
import { Gender, PaymentMethodInstance, uniqid } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { getServiceParameter, formatDate } from '../Payloads';

let method: PaymentMethodInstance<'CreditManagement3'>;
let invoiceKey: string;
let invoice: string;

beforeEach(() => {
    method = buckarooClientTest.method('CreditManagement3');
});
describe('Testing Credit Management', () => {
    test('CreateInvoice', async () => {
        const response = await method.createInvoice(creditManagementTestInvoice()).request();
        invoiceKey = getServiceParameter(response, 'InvoiceKey');

        expect(response.isSuccess()).toBeTruthy();
    });
    test('Pause Invoice', async () => {
        const response = await method.pauseInvoice({ invoice: invoice }).request();

        expect(response.isSuccess()).toBeTruthy();
    });
    test('UnPause Invoice', async () => {
        const response = await method.unpauseInvoice({ invoice: invoice }).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Invoice Info', async () => {
        const response = await method
            .invoiceInfo({
                invoice: invoice,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Debtor Info', async () => {
        const response = await method
            .debtorInfo({
                debtor: {
                    code: 'johnsmith4',
                },
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('AddOrUpdateProductLines', async () => {
        expect(invoiceKey).toBeDefined();

        const response = await method
            .addOrUpdateProductLines({
                invoiceKey: invoiceKey,
                articles: [
                    {
                        type: 'Regular',
                        identifier: 'Articlenumber1',
                        description: 'Blue Toy Car',
                        vatPercentage: 21,
                        totalVat: 12,
                        totalAmount: 123,
                        quantity: 2,
                        price: 20.1,
                    },
                    {
                        type: 'Regular',
                        identifier: 'Articlenumber2',
                        description: 'Red Toy Car',
                        vatPercentage: 21,
                        totalVat: 12,
                        totalAmount: 123,
                        quantity: 1,
                        price: 10.1,
                    },
                ],
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    // No DebtorFile available for testing.
    // test('resumeDebtorFile', async () => {
    //     return method
    //         .resumeDebtorFile({ debtorFileGuid: 'xxx' })
    //         .request()
    //         .then((data) => {
    //             expect(data.isValidationFailure()).toBeTruthy();
    //         });
    // });
    // test('pauseDebtorFile', async () => {
    //     return method
    //         .pauseDebtorFile({ debtorFileGuid: 'xxx' })
    //         .request()
    //         .then((data) => {
    //             expect(data.isValidationFailure()).toBeTruthy();
    //         });
    // });
    test('addOrUpdateDebtor', async () => {
        const response = await method
            .addOrUpdateDebtor({
                debtor: {
                    code: 'johnsmith4',
                },
                person: {
                    culture: 'nl-NL',
                    lastName: 'Acceptatie',
                },
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
    });
    test('CreateCombinedInvoice', async () => {
        const combinedInvoice = method.createCombinedInvoice(creditManagementTestInvoice());
        const response = await buckarooClientTest
            .method('sepadirectdebit')
            .combine(combinedInvoice.data)
            .pay({
                iban: 'NL13TEST0123456789',
                bic: 'TESTNL2A',
                mandateReference: '1DCtestreference',
                mandateDate: '2020-01-01',
                collectDate: '2030-07-03',
                amountDebit: 100,
                customer: {
                    name: 'Test Acceptatie',
                },
                invoice: uniqid('TestInvoice'),
            })
            .request();

        expect(response.isPendingProcessing()).toBeTruthy();
    });

    test('CreateCreditNote', async () => {
        const response = await method
            .createCreditNote({
                invoice: uniqid(),
                originalInvoiceNumber: '6383cbc0498a24',
                invoiceDate: formatDate(new Date()),
                invoiceAmount: '0.01',
                invoiceAmountVAT: '1',
                sendCreditNoteMessage: 'Email',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });

    // Payment plans are not enabled for this Buckaroo Credit Management subscription
    // test('CreatePaymentPlan', async () => {
    //     let oneMonthFromNow = new Date();
    //     oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    //     const response = await method
    //         .createPaymentPlan({
    //             description: 'Payment in two intstallments',
    //             includedInvoiceKey: 'EFD023706C6D4F1CAC8E461FB269E583',
    //             dossierNumber: 'PaymentplanJohnsmith4',
    //             installmentCount: 2,
    //             initialAmount: 5.0,
    //             startDate: formatDate(oneMonthFromNow),
    //             interval: CreditManagementInstallmentInterval.DAY,
    //             paymentPlanCostAmount: 0.0,
    //             paymentPlanCostAmountVat: 0.0,
    //             recipientEmail: 'test@buckaroo.nl',
    //         })
    //         .request();
    //     expect(response.isSuccess()).toBeTruthy();
    // });
    //todo: terminatePaymentPlan
});
export const creditManagementTestInvoice = (append: object = {}): IInvoice => {
    invoice = uniqid();

    return {
        invoice: invoice,
        description: 'buckaroo_schema_test_PDF',
        applyStartRecurrent: false,
        invoiceAmount: 10,
        invoiceAmountVAT: 1,
        invoiceDate: formatDate(new Date()),
        dueDate: '2030-01-01',
        schemeKey: 'rwe1kw',
        poNumber: 'PO-12345',
        maxStepIndex: 1,
        allowedServices: 'ideal,mastercard',
        debtor: {
            code: 'johnsmith4',
        },
        email: 'test@buckaroo.nl',
        phone: {
            mobile: '06198765432',
        },
        person: {
            culture: 'nl-NL',
            title: 'Msc',
            initials: 'JS',
            firstName: 'Test',
            lastNamePrefix: 'Jones',
            lastName: 'Aflever',
            gender: Gender.MALE,
        },
        company: {
            culture: 'nl-NL',
            name: 'Buckaroo B.V.',
            vatApplicable: true,
            vatNumber: 'NL140619562B01',
            chamberOfCommerce: '20091741',
        },
        address: {
            street: 'Hoofdstraat',
            houseNumber: '80',
            houseNumberAdditional: 'a',
            zipcode: '8441ER',
            city: 'Heerenveen',
            state: 'Friesland',
            country: 'NL',
        },
        articles: [
            {
                productGroupName: 'Toys',
                productGroupOrderIndex: 1,
                productOrderIndex: 1,
                type: 'Regular',
                identifier: 'ART12',
                description: 'Blue Toy Car',
                quantity: 3,
                unitOfMeasurement: 'piece(s)',
                price: 10,
                discountPercentage: 20,
                totalDiscount: 6,
                vatPercentage: 21,
                totalVat: 0.6,
                totalAmountExVat: 8.4,
                totalAmount: 123,
            },
            {
                productGroupName: 'Toys',
                productGroupOrderIndex: 1,
                productOrderIndex: 2,
                type: 'Regular',
                identifier: 'ART12',
                description: 'Blue Toy Car',
                quantity: 3,
                unitOfMeasurement: 'piece(s)',
                price: 10,
                discountPercentage: 20,
                totalDiscount: 6,
                vatPercentage: 21,
                totalVat: 0.6,
                totalAmountExVat: 8.4,
                totalAmount: 123,
            },
        ],
        ...append,
    };
};
