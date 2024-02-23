import buckarooClient from '../buckarooClient';
const alipay = buckarooClient.method('alipay');
//Pay
alipay
    .pay({
        amountDebit: 10.1,
        description: 'Alipay Payment',
        useMobileView: false,
    })
    .request();
//Refund
alipay
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Alipay Refund'
    })
    .request();
