import buckarooClientTest from "../BuckarooClient.test";

const method = buckarooClientTest.method("MBWay");
describe("Mbway methods", () => {
    test("Pay", () => {
        return method
            .pay({
                amountDebit: 0.1,
            }).request().then((response) => {
                expect(response.isValidationFailure()).toBeTruthy()
            })
    });
})