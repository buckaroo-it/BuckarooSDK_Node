import buckarooClient from "../buckarooClient";

const wechatpay = buckarooClient.method("wechatpay");

//Pay
wechatpay
    .pay({
        amountDebit: 10.1,
        issuer: "ABNANL2A",
        description: "WeChatPay Payment",
        locale: "en-US",
    })
    .request();
//Refund
wechatpay
    .refund({
        originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        amountCredit: 10.1,
        invoice: "WeChatPay Refund",
    })
    .request();
