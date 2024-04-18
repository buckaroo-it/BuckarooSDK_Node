import buckaroo from '../buckarooClient';

const creditManagement = buckaroo.method('CreditManagement3');

// Sometimes we need to combine multiple payments.
// By calling "combine" it will combine the payload of the method with the next method or a given payload.

const invoice = creditManagement.createCombinedInvoice({
    invoice: '',
    applyStartRecurrent: false,
    invoiceAmount: 10,
    invoiceAmountVAT: 1,
    invoiceDate: '',
    dueDate: '',
    schemeKey: '2amq34',
    maxStepIndex: 1,
    allowedServices: 'ideal,mastercard',
    debtor: {
        code: 'johnsmith4',
    },
    email: 'youremail@example.nl',
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
        gender: 'male',
    },
    company: {
        culture: 'nl-NL',
        name: 'My Company Corporation',
        vatApplicable: true,
        vatNumber: 'NL140619562B01',
        chamberOfCommerce: '20091741',
    },
    address: {
        street: 'Hoofdtraat',
        houseNumber: '90',
        houseNumberAdditional: 'A',
        zipcode: '8441ER',
        city: 'Heerenveen',
        state: 'Friesland',
        country: 'NL',
    },
});

buckaroo
    .method('sepadirectdebit')
    .combine(invoice.data)
    .pay({
        invoice: '',
        amountDebit: 10.1,
        iban: 'NL13TEST0123456789',
        bic: 'TESTNL2A',
        collectdate: '2022-06-03',
        mandateReference: '1DCtestreference',
        mandateDate: '2022-07-03',
        customer: {
            name: 'John Smith',
        },
    })
    .request();
