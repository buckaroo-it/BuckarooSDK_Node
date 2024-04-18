import buckarooClient from '../buckarooClient';

const sofort = buckarooClient.method('sofortueberweisung');

//Pay
sofort
    .pay({
        amountDebit: 10.1,
        description: 'Sofort Payment',
        invoice: 'testinvoicesofort',
    })
    .request();
//Refund
sofort
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Sofort Refund',
    })
    .request();
