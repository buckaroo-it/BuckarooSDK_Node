import BuckarooClient from "./BuckarooClient";

require('dotenv').config({ path: '../.env' });

const api = new BuckarooClient(
    process.env.BPE_WEBSITE_KEY || 'KEY',
    process.env.BPE_SECRET_KEY || 'SECRET'
);
import Ideal from "./methods/ideal";
const method = new Ideal(api);

method.pay({
        returnURL     : 'https://example.com/return',
        invoice       : 'R1000',
        amountDebit   : 10.10,
        issuer        : 'ABNANL2A'
})
//
// method.pay({
//         returnURL     : 'https://example.com/return',
//         invoice       : 'R1000',
//         amountDebit   : 10.10,
//         issuer        : 'ABNANL2A'
// })
//
// method.issuers()
//
// method.payRemainder()