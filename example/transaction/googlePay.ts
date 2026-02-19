import buckarooClient from '../buckarooClient';

const googlepay = buckarooClient.method('googlepay');

//Pay
googlepay
    .pay({
        amountDebit: 10.1,
        description: 'GooglePay Payment',
        paymentData: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        customerCardName: 'XXXXXXX',
    })
    .request();
//PayRemainder
googlepay
    .payRemainder({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountDebit: 10.1,
        description: 'GooglePay Payment',
        paymentData: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        customerCardName: 'XXXXXXX',
    })
    .request();
//Refund
googlepay
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'GooglePay Refund',
    })
    .request();
