require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Bancontact from "../PaymentMethods/Bancontact/Bancontact";
import { uniqid } from "../Functions/Functions";

const client = new BuckarooClient();
const method = new Bancontact(client);


// method.pay({
//     amountDebit: 10,
//     invoice: uniqid(),
//     saveToken:true,
// });

// method.authenticate({
//     invoice: uniqid(),
//     description: "Bancontact Authenticate SaveToken",
//     amountDebit: 0.02,
//     saveToken: false
// })

method.payEncrypted({
    invoice: uniqid(),
    amountDebit: 10.1,
    description: "Bancontact PayEncrypted Test 123",
    encryptedCardData: "001SlXfd8MbiTd/JFwCiGVs3f6o4x6xt0aN29NzOSNZHPKlVsz/EWeQmyhb1gGZ86VY88DP7gfDV+UyjcPfpVfHZd7u+WkO71hnV2QfYILCBNqE1aiPv2GQVGdaGbuoQloKu1o3o3I1UDmVxivXTMQX76ovot89geA6hqbtakmpmvxeiwwea3l4htNoX1IlD1hfYkDDl9rzSu5ypcjvVs6aRGXK5iMHnyrmEsEnfdj/Q5XWbsD5xAm4u3y6J8d4UP7LB31VLECzZUTiJOtKKcCQlT01YThIkQlj8PWBBMtt4H52VN3IH2+wPYtR8HiOZzcA2HA7UxozogIpS53tIURj/g=="
})
method.payRecurring({
    invoice: uniqid(),
    amountDebit: 10.5,
    originalTransactionKey: "91D08EC01F414926A4CA29C059XXXXXX"
})