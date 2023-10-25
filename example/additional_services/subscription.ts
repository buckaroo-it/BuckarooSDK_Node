require('../buckarooClient');
import Subscriptions from '../../src/PaymentMethods/Subscriptions';
import Ideal from '../../src/PaymentMethods/Ideal';

const subscription = new Subscriptions();
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

(async () => {
    const combinedPayment = await new Ideal()
        .combine(subscription)
        .pay({
            amountDebit: 1,
            currency: 'EUR',
            description: 'test',
        })
        .request();
    console.log(combinedPayment);
})();
