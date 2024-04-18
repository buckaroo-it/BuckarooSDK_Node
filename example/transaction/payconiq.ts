import buckarooClient from "../buckarooClient";

const payconiq = buckarooClient.method("payconiq");

//Pay
payconiq
    .pay({
        amountDebit: 10.1,
        description: "Payconiq Payment",
    })
    .request();
//Refund
payconiq
    .refund({
        originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        amountCredit: 10.1,
        invoice: "Payconiq Refund",
    })
    .request();
