import buckarooClient from '../buckarooClient';
import { uniqid } from '../../src';

const wero = buckarooClient.method('Wero');

wero
    .pay({
        amountDebit: 100,
        invoice: uniqid(),
        description: 'Wero Payment',
    })
    .request();

wero
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 100,
        invoice: uniqid(),
        description: 'Wero Refund',
    }).request();

wero
    .authorize({
        invoice: uniqid(),
        description: 'Wero Authorize',
        amountDebit: 100,
    })
    .request();

wero
    .cancelAuthorize({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 100,
        invoice: uniqid(),
    })
    .request();

wero
    .capture({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountDebit: 100,
        invoice: uniqid(),
        description: 'Wero Capture',
    })
    .request();