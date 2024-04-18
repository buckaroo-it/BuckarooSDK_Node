import buckarooClientTest from "../BuckarooClient.test";
import { uniqid } from "../../src";

const method = buckarooClientTest.method("knaken");

describe("Knaken", () => {
    test("Pay", async () => {
        return method
            .pay({
                amountDebit: 0.01,
                order: uniqid(),
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
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
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
});
