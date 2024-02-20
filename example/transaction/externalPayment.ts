import buckarooClient from '../buckarooClient';

const external = buckarooClient.method('externalpayment');

//Pay
external
    .pay({
        amountDebit: 10.1,
        description: 'External Payment',
    })
    .request();
//Refund
external
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Ideal Refund',
    })
    .request();
