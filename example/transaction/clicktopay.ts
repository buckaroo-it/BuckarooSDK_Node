import buckarooClient from '../buckarooClient';

const clicktopay = buckarooClient.method('ClickToPay');

//Pay
clicktopay.pay({
    amountDebit: 0.01,
    description: 'ClickToPay Payment',
}).request();
