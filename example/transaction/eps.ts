import buckarooClient from '../buckarooClient';

const eps = buckarooClient.method('eps');

//Pay
eps.pay({
    amountDebit: 10.1,
    description: 'EPS Payment',
}).request();
//Refund
eps.refund({
    originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    amountCredit: 10.1,
    invoice: 'EPS Refund',
}).request();
