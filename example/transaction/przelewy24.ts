import buckarooClient from '../buckarooClient';

const przelewy24 = buckarooClient.method('przelewy24');

//Pay
przelewy24
    .pay({
        amountDebit: 100,
        customer: {
            firstName: 'Test',
            lastName: 'Acceptatie',
        },
        email: 'test@buckaroo.nl',
    })
    .request();
//Refund
przelewy24
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Przelewy24 Refund',
    })
    .request();
