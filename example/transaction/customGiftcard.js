import buckarooClient from '../buckarooClient';
import { uniqid } from '../../src';

//General approach
const giftcard = buckarooClient.method('giftcard');

//Pay
giftcard
    .pay({
        amountDebit: 10,
        description: 'Custom Giftcard Payment',
        name: 'customgiftcard', // the service code
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
        name: 'customgiftcard', // the service code
        email: 'test@buckaroo.nl',
        lastName: 'Acceptatie',
    })
    .request();


//Alternative: Only when using one of the service codes: customgiftcard, customgiftcard2, customgiftcard3
const customGiftcard = buckarooClient.method('customgiftcard3');

//Pay
customGiftcard
    .pay({
        amountDebit: 10,
        description: 'Custom Giftcard Payment',
        cardNumber: '0000000000000000001',
        pin: '1000',
    })
    .request();
//Refund
customGiftcard
    .refund({
        originalTransactionKey: uniqid(),
        amountCredit: 10,
        invoice: 'Custom Giftcard Refund',
        email: 'test@buckaroo.nl',
        lastName: 'Acceptatie',
    })
    .request();