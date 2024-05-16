import buckarooClient from '../buckarooClient';

const mbway = buckarooClient.method('MBWay');

//Pay
mbway
    .pay({
        amountDebit: 10.1,
        description: 'MBWay Payment',
    })
    .request();
//Refund
mbway
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'MBWay Refund',
    })
    .request();
