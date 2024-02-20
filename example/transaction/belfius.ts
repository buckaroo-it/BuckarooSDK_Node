import buckarooClient from '../buckarooClient';

const belfius = buckarooClient.method('belfius');

//Pay
belfius
    .pay({
        amountDebit: 10.1,
        description: 'Belfius Payment',
    })
    .request();
//Refund
belfius
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Belfius Refund',
    })
    .request();
