import buckarooClient from "../buckarooClient";

const giropay = buckarooClient.method("giropay");

//Pay
giropay
    .pay({
        amountDebit: 10.1,
        bic: "XXXXXXXXX",
        description: "Giropay Payment",
    })
    .request();
//Refund
giropay
    .refund({
        originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        amountCredit: 10.1,
        invoice: "Giropay Refund",
    })
    .request();
