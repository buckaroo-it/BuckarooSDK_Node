import {initializeBuckarooClient} from "../BuckarooClient";
import GiroPay from "../PaymentMethods/Giropay/index";

initializeBuckarooClient();

const method = GiroPay()


describe("Testing Giropay methods", () => {
    test("Pay", async () => {
        method.pay({
            bic: "",
            costumerIBAN: "",
            amountDebit: 0
        }).then((response) => {
            console.log(response);

        })
    })
    test("Refund", async () => {
        method.refund({
            amountCredit: 0,
            originalTransactionKey: ""
        }).then((response) => {
            console.log(response);

        })
    })
})