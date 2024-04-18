import buckarooClient from "../buckarooClient";

const idealprocessing = buckarooClient.method("idealprocessing");

//Pay
idealprocessing
    .pay({
        amountDebit: 10.1,
        issuer: "ABNANL2A",
        description: "Ideal Processing Payment",
    })
    .request();

//Issuers
idealprocessing.issuers();
