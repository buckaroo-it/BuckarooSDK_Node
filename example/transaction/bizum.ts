import buckarooClient from '../buckarooClient';
import { uniqid } from '../../src/Utils';

const bizum = buckarooClient.method('bizum');

//Pay
bizum
    .pay({
        amountDebit: 10.1,
        invoice: uniqid(),
        description: 'Bizum Payment',
    })
    .request();
//Refund
bizum
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: uniqid(),
        description: 'Bizum Refund',
    })
    .request();
