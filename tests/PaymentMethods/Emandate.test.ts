import buckarooClientTest from "../BuckarooClient.test";
import { ServiceCode } from "../../src";

const method = buckarooClientTest.method("emandate");
describe("Testing Emandates methods", () => {
    test("GetIssuerList", async () => {
        return method
            .issuerList()
            .request()
            .then((response) => {
                expect(response.isSuccess()).toBeTruthy();
            });
    });
    test("CreateMandate", async () => {
        return method
            .createMandate({
                debtorReference: "XXXXXXXXX",
                language: "nl",
                continueOnIncomplete: true,
                purchaseId: "XXXXXXXXXXXXXX",
                sequenceType: 0,
            })
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy();
            });
    });
    test("GetStatus", async () => {
        return method
            .status({ mandateId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" })
            .request()
            .then((response) => {
                expect(response.isSuccess()).toBeTruthy();
            });
    });
    test("ModifyMandate", async () => {
        return method
            .modifyMandate({
                originalMandateId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                continueOnIncomplete: true,
            })
            .request()
            .then((response) => {
                expect(response.isFailed()).toBeTruthy();
            });
    });
    test("CancelMandate", async () => {
        return method
            .setServiceCode("emandateb2b" as ServiceCode)
            .cancelMandate({
                mandateId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                purchaseId: "XXXXXXXXXXXXXX",
            })
            .request()
            .then((response) => {
                expect(response.isValidationFailure()).toBeTruthy();
            });
    });
});
