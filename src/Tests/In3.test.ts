import {initializeBuckarooClient} from "../BuckarooClient";
import In3 from "../PaymentMethods/In3";
import Gender from "../Constants/Gender";

initializeBuckarooClient();

const in3 = In3()


describe("Testing In3 methods", () => {
    test("Pay", async () => {

        await in3.pay({
            clientIP: {
                type: 0,
                address: "0.0.0.0"
            },
            amountDebit: 9.5,
            description: "This is a test order",
            invoiceDate: "22-01-2018",
            customerType: "Company",
            email: "test@buckaroo.nl",
            phone: {
                mobile: "0612345678",
                fax: "0512345678",
            },
            articles: [
                {
                    identifier: "123456",
                    description: "Blue Toy Car",
                    quantity: 10,
                    price: 10,
                }
            ],
            company: {
                companyName: "My Company B.V.",
                chamberOfCommerce: "123456"
            },
            customer: {
                gender: Gender.FEMALE,
                initials: "J.S.",
                lastName: "Aflever",
                culture: "nl-NL",
                birthDate: "1990-01-01"
            },
            address: {
                street: "Hoofdstraat",
                houseNumber: "2",
                houseNumberAdditional: "a",
                zipcode: "8441EE",
                city: "Heerenveen",
                country: "NL"
            },
            subTotals: [
                {
                    name: "Korting",
                    value: -2
                },
                {
                    name: "Betaaltoeslag",
                    value: 0.5
                },
                {
                    name: "Verzendkosten",
                    value: 1
                }
            ]
        }).then((response) => {
            console.log(response);

        })
    })
})