import buckarooClient from '../buckarooClient';

const multibanco = buckarooClient.method('multibanco');

//Pay
multibanco
    .pay({
        amountDebit: 10.1,
        description: 'Multibanco Payment',
    })
    .request();
//Refund
multibanco
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Multibanco Refund',
    })
    .request();
