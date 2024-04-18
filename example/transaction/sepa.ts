import buckarooClient from "../buckarooClient";
import { uniqid } from "../../src";

const sepa = buckarooClient.method("sepadirectdebit");

//Pay
sepa.pay({
    invoice: uniqid(),
    amountDebit: 100,
    iban: "NLXXTESTXXXXXXXXXX",
    bic: "XXXXXXXXX",
    collectdate: "2022-12-01",
    mandateReference: "XXXXXXXXXXXXXXX",
    mandateDate: "2022-07-03",
    customer: {
        name: "Test Acceptatie",
    },
}).request();
//Refund
sepa.refund({
    originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    amountCredit: 10.1,
    invoice: "SEPA Refund",
}).request();
//Authorize
sepa.authorize({
    invoice: uniqid(),
    amountDebit: 100,
    iban: "NLXXTESTXXXXXXXXXX",
    bic: "XXXXXXXXX",
    collectdate: "2022-12-01",
    mandateReference: "XXXXXXXXXXXXXXX",
    mandateDate: "2022-07-03",
    customer: {
        name: "Test Acceptatie",
    },
}).request();
//PayRecurrent
sepa.payRecurrent({
    invoice: uniqid(),
    amountDebit: 100,
    iban: "NLXXTESTXXXXXXXXXX",
    bic: "XXXXXXXXX",
    collectdate: "2022-12-01",
    mandateReference: "XXXXXXXXXXXXXXX",
    mandateDate: "2022-07-03",
    customer: {
        name: "Test Acceptatie",
    },
}).request();
