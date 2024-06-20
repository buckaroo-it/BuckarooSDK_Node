import buckarooClient from '../buckarooClient';
import { uniqid } from '../../src';

const giftcard = buckarooClient.method('giftcard');

//Pay
giftcard
    .pay({
        amountDebit: 10,
        description: 'Custom Giftcard Payment',
        name: 'customgiftcard3',
        cardNumber: '0000000000000000001',
        pin: '1000',
    })
    .request();
//Refund
giftcard
    .refund({
        originalTransactionKey: uniqid(),
        amountCredit: 10,
        invoice: 'Custom Giftcard Refund',
        name: 'customgiftcard3',
        email: 'test@buckaroo.nl',
        lastName: 'Acceptatie',
    })
    .request();
