import buckarooClient from '../buckarooClient';

const blik = buckarooClient.method('blik');

//Pay
blik
    .pay({
        currency: 'PLN',
        amountDebit: 10.00,
        invoice: 'Blik Test Plugins Example',
        description: 'Blik Test Plugins Example',
        email: 'test@buckaroo.nl',
    })
    .request();
//Refund
blik
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        currency: 'PLN',
        amountCredit: 5.00,
        invoice: 'Refund Blik Test Plugins Example',
        description: 'Refund Blik Test Plugins Example',
    })
    .request();
