import buckaroo from '../buckarooClient';

const subscription = buckaroo.method('CreditManagement3');

subscription.createCombined({
    address: undefined,
    allowedServices: '',
    b2b: '',
    bankAccount: { accountName: '', bic: '', iban: '' },
    billingTiming: 0,
    company: undefined,
    configuration: undefined,
    configurationCode: '',
    customerAccountName: '',
    customerBIC: '',
    customerIBAN: '',
    debtor: { code: '' },
    email: '345345345',
    includeTransaction: false,
    mandateReference: '',
    subscriptionGuid: '',
    termStartDay: 0,
    termStartMonth: 0,
    termStartWeek: '',
    transactionVatPercentage: 0,
});

buckaroo
    .method('ideal')
    .combine(subscription)
    .pay({
        amountDebit: 1,
        currency: 'EUR',
        description: 'test',
    })
    .request();
