import {initializeBuckarooClient} from "../BuckarooClient";
import IDealQR from "../PaymentMethods/iDealQR/index";

initializeBuckarooClient();

const method = IDealQR()

describe("Testing iDealQR methods", () => {
    test("Pay", async () => {
        method.generate({
            amount: 0,
            amountDebit: 0,
            amountIsChangeable: false,
            Description: "",
            expiration: "",
            imageSize: 0,
            isOneOff: false,
            maxAmount: 0,
            minAmount: 0,
            purchaseId: ""
        }).then((response) => {
            console.log(response);

        })
    })
})