import buckarooClient from '../buckarooClient';

const giftcard = buckarooClient.method('giftcard');

//Pay
giftcard
    .pay({
        amountDebit: 10,
        description: 'Giftcard Payment',
        intersolveCardnumber: '0000000000000000001',
        intersolvePIN: '1000',
    })
    .request();
//Refund
giftcard
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Giftcard Refund',
        email: 'test@buckaroo.nl',
        lastName: 'Acceptatie',
    })
    .request();
