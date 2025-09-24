import buckarooClient from '../buckarooClient';
import { uniqid } from '../../src';

const swish = buckarooClient.method('swish');

//Pay
swish
    .pay({
        currency: 'SEK',
        amountDebit: 10.0,
        invoice: uniqid(),
        description: 'Swish Payment',
    })
    .request();
//Refund
swish
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        currency: 'SEK',
        amountCredit: 10.0,
        invoice: uniqid(),
        description: 'Swish Refund',
    })
    .request();
