import buckarooClient from "../buckarooClient";

const paypal = buckarooClient.method("paypal");

//Pay
paypal
    .pay({
        amountDebit: 10.1,
        description: "Paypal Payment",
    })
    .request();
//Refund
paypal
    .refund({
        originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        amountCredit: 10.1,
        invoice: "Paypal Refund",
    })
    .request();
