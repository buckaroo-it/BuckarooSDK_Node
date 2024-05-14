import buckarooClient from '../buckarooClient';

const paybybank = buckarooClient.method('PayByBank');

//Pay
paybybank
    .pay({
        amountDebit: 10.1,
        issuer: 'ABNANL2A',
        description: 'PayByBank Payment',
        countryCode: 'NL',
    })
    .request();
//Refund
paybybank
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'PayByBank Refund',
    })
    .request();

//Issuers
paybybank.issuers();
