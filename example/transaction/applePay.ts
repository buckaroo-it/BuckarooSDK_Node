import buckarooClient from '../buckarooClient';

const applepay = buckarooClient.method('applepay');

//Pay
applepay
    .pay({
        amountDebit: 10.1,
        description: 'ApplePay Payment',
        paymentData: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        customerCardName: 'XXXXXXX',
    })
    .request();
//Refund
applepay
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'ApplePay Refund',
    })
    .request();
