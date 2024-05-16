import buckarooClient from '../buckarooClient';

const knaken = buckarooClient.method('knaken');

//Pay
knaken
    .pay({
        amountDebit: 10.1,
        description: 'Knaken Payment',
    })
    .request();
//Refund
knaken
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: '',
    })
    .request();
