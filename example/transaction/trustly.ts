import buckarooClient from '../buckarooClient';
import { uniqid } from '../../src';

const trustly = buckarooClient.method('trustly');

//Pay
trustly
    .pay({
        amountDebit: 10.1,
        description: 'Trustly Payment',
        invoice: uniqid(),
        customer: {
            firstName: 'Test',
            lastName: 'Acceptatie',
            countryCode: 'NL',
        },
    })
    .request();
//Refund
trustly
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Trustly Refund',
    })
    .request();
