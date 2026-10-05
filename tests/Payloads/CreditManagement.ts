import { Gender, uniqid } from '../../src';
import { IInvoice } from '../../src/PaymentMethods/CreditManagement/Models/Invoice';
import { formatDate } from './index';

export const creditManagementTestInvoice = (append: object = {}): IInvoice => {
    const invoice = uniqid();

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
