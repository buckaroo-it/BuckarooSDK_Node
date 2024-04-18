import buckarooClientTest from "../BuckarooClient.test";

const method = buckarooClientTest.method("MBWay");
describe("Mbway methods", () => {
    test("Pay", async () => {
        return method
            .pay({
                amountDebit: 100,
            })
            .request()
            .then((response) => {
                expect(response.isValidationFailure()).toBeTruthy();
            });
    });
});
