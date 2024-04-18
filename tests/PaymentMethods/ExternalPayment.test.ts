import buckarooClientTest from "../BuckarooClient.test";
import { uniqid } from "../../src";

const method = buckarooClientTest.method("externalpayment");
describe("Testing ExternalPayment methods", () => {
    test("Pay", async () => {
        return method
            .pay({
                amountDebit: 100,
            })
            .request()
            .then((response) => {
                expect(response.isSuccess()).toBeTruthy();
            });
    });
    test("Refund", async () => {
        return method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            })
            .request()
            .then((response) => {
                expect(response.isFailed()).toBeTruthy();
            });
    });
});
