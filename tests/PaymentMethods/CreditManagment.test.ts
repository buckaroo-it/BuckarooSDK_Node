import { IInvoice } from "../../src/PaymentMethods/CreditManagement/Models/Invoice";
import { CreditManagementInstallmentInterval, Gender, uniqid } from "../../src";
import buckarooClientTest from "../BuckarooClient.test";

const creditManagement = buckarooClientTest.method("CreditManagement3");

describe("Testing Credit Management", () => {
    test("CreateInvoice", async () => {
        return creditManagement
            .createInvoice(creditManagementTestInvoice())
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("CreateInvoice With Articles", async () => {
        return creditManagement
            .createInvoice(
                creditManagementTestInvoice({
                    invoice: uniqid(),
                    description: "buckaroo_schema_test_PDF",
                    invoiceAmount: 217.8,
                    invoiceDate: "2022-01-01",
                    dueDate: "2024-01-01",
                    schemeKey: "XXXXXXX",
                    poNumber: "XX-XXXXX",
                    debtor: {
                        code: "XXXXXXXX",
                    },
                    articles: [
                        {
                            productGroupName: "Toys",
                            productGroupOrderIndex: 1,
                            productOrderIndex: 1,
                            type: "Regular",
                            identifier: "ART12",
                            description: "Blue Toy Car",
                            quantity: 3,
                            unitOfMeasurement: "piece(s)",
                            price: 10,
                            discountPercentage: 20,
                            totalDiscount: 6,
                            vatPercentage: 21,
                            totalVat: 0.6,
                            totalAmountExVat: 8.4,
                            totalAmount: 123,
                        },
                        {
                            productGroupName: "Toys",
                            productGroupOrderIndex: 1,
                            productOrderIndex: 2,
                            type: "Regular",
                            identifier: "ART12",
                            description: "Blue Toy Car",
                            quantity: 3,
                            unitOfMeasurement: "piece(s)",
                            price: 10,
                            discountPercentage: 20,
                            totalDiscount: 6,
                            vatPercentage: 21,
                            totalVat: 0.6,
                            totalAmountExVat: 8.4,
                            totalAmount: 123,
                        },
                    ],
                })
            )
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("Pause Invoice", async () => {
        return creditManagement
            .pauseInvoice({ invoice: uniqid() })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("UnPause Invoice", async () => {
        return creditManagement
            .unpauseInvoice({ invoice: uniqid() })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("Invoice Info", async () => {
        return creditManagement
            .invoiceInfo({
                invoice: uniqid(),
                invoices: [{ invoiceNumber: "INV002" }, { invoiceNumber: "INV003" }],
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy();
            });
    });
    test("Debtor Info", async () => {
        return creditManagement
            .debtorInfo({
                debtor: {
                    code: "XXXXXXXX",
                },
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy();
            });
    });
    test("AddOrUpdateProductLines", async () => {
        return creditManagement
            .addOrUpdateProductLines({
                invoiceKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                articles: [
                    {
                        type: "Regular",
                        identifier: "Articlenumber1",
                        description: "Blue Toy Car",
                        vatPercentage: 21,
                        totalVat: 12,
                        totalAmount: 123,
                        quantity: 2,
                        price: 20.1,
                    },
                    {
                        type: "Regular",
                        identifier: "Articlenumber2",
                        description: "Red Toy Car",
                        vatPercentage: 21,
                        totalVat: 12,
                        totalAmount: 123,
                        quantity: 1,
                        price: 10.1,
                    },
                ],
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("resumeDebtorFile", async () => {
        return creditManagement
            .resumeDebtorFile({ debtorFileGuid: "xxx" })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("pauseDebtorFile", async () => {
        return creditManagement
            .pauseDebtorFile({ debtorFileGuid: "xxx" })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("addOrUpdateDebtor", async () => {
        return creditManagement
            .addOrUpdateDebtor({
                debtor: {
                    code: "XXXXXXXX",
                },
                person: {
                    culture: "nl-NL",
                    lastName: "Acceptatie",
                },
            })
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test("CreateCombinedInvoice", async () => {
        const combinedInvoice = creditManagement.createCombinedInvoice(creditManagementTestInvoice());
        return buckarooClientTest
            .method("sepadirectdebit")
            .combine(combinedInvoice.data)
            .pay({
                iban: "NLXXTESTXXXXXXXXXX",
                bic: "XXXXXXXXX",
                mandateReference: "XXXXXXXXXXXXXXX",
                mandateDate: "2020-01-01",
                collectDate: "2020-07-03",
                amountDebit: 100,
                customer: {
                    name: "Test Acceptatie",
                },
                invoice: uniqid("TestInvoice"),
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("CreatePaymentPlan", async () => {
        return creditManagement
            .createPaymentPlan({
                description: "Payment in two intstallments",
                includedInvoiceKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                dossierNumber: "XXXXXXXXXXXXXXXXXXXXXX",
                installmentCount: 2,
                initialAmount: 100,
                startDate: "2030-01-01",
                interval: CreditManagementInstallmentInterval.MONTH,
                paymentPlanCostAmount: 3.5,
                paymentPlanCostAmountVat: 1.2,
                recipientemail: "test@buckaroo.nl",
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("pauseInvoice", async () => {
        return creditManagement
            .pauseInvoice({
                invoice: uniqid(),
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});
export const creditManagementTestInvoice = (append: object = {}): IInvoice => {
    return {
        invoice: uniqid(),
        applyStartRecurrent: false,
        invoiceAmount: 10,
        invoiceAmountVAT: 1,
        invoiceDate: "2022-01-01",
        dueDate: "2030-01-01",
        schemeKey: "XXXXXX",
        maxStepIndex: 1,
        allowedServices: "ideal,mastercard",
        debtor: {
            code: "XXXXXXXX",
        },
        email: "test@buckaroo.nl",
        phone: {
            mobile: "0612345678",
        },
        person: {
            culture: "nl-NL",
            title: "Msc",
            initials: "JS",
            firstName: "Test",
            lastNamePrefix: "Jones",
            lastName: "Acceptatie",
            gender: Gender.MALE,
        },
        company: {
            culture: "nl-NL",
            name: "Buckaroo B.V.",
            vatApplicable: true,
            vatNumber: "NLXXXXXXXXXXB01",
            chamberOfCommerce: "XXXXXX41",
        },
        address: {
            street: "Hoofdstraat",
            houseNumber: "80",
            houseNumberAdditional: "a",
            zipcode: "8441ER",
            city: "Heerenveen",
            state: "Friesland",
            country: "NL",
        },
        ...append,
    };
};
