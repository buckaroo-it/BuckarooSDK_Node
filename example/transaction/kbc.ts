import buckarooClient from '../buckarooClient';

const kbc = buckarooClient.method('KBCPaymentButton');

//Pay
kbc.pay({
    amountDebit: 10.1,
    description: 'KBC Payment',
}).request();
//Refund
kbc.refund({
    originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    amountCredit: 10.1,
    invoice: 'KBC Refund',
}).request();
