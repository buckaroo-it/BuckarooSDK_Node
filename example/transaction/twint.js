import buckarooClient from '../buckarooClient';
import { uniqid } from '../../src';

const twint = buckarooClient.method('twint');

//Pay
twint
    .pay({
        currency: 'CHF',
        amountDebit: 10.1,
        invoice: uniqid(),
        description: 'Twint Payment',
    })
    .request();
//Refund
twint
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: uniqid(),
        description: 'Twint Refund',
    })
    .request();
