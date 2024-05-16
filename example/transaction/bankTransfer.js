import buckarooClient from '../buckarooClient';
import { Gender } from '../../src';

const transfer = buckarooClient.method('transfer');

//Pay
transfer
    .pay({
        amountDebit: 10.1,
        description: 'Transfer Payment',
        customer: {
            firstName: 'Test',
            lastName: 'Acceptatie',
            gender: Gender.MALE,
        },
        email: 'test@buckaroo.nl',
        sendMail: true,
        dateDue: '2024-10-10',
    })
    .request();
//Refund
transfer
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Transfer Refund',
    })
    .request();
