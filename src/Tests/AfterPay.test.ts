
import { initializeBuckarooClient } from '../BuckarooClient'
import Afterpay from "../PaymentMethods/Afterpay";
import RecipientCategory from "../Constants/RecipientCategory";
initializeBuckarooClient()

const method = Afterpay()

describe('testing Ideal methods', () => {

    test('Pay Simple Payload', async () => {
        method.setPayload(payload)
        await method.pay().then((data) => {
            expect(data).toBeDefined()
            console.log(data)
        })
    })
    test('Refund', async () => {
        method.setRequest(payload)
        await method.refund().then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('Specifications', async () => {
        const idealSpecifications = await method.specification()
        console.log(idealSpecifications)
    })
})

const payload = {
    amountDebit: 52.3,
    clientIP: {
        address: '123.456.789.123',
        type: 0
    },
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            careOf: "John Smith",
            title: "Mrs",
            firstName: "John",
            lastName: "Do",
            birthDate: "1990-01-01",
            conversationLanguage: "NL",
            identificationNumber: "IdNumber12345",
            customerNumber: "customerNumber12345"
        },
        address: {
            street: "Hoofdstraat",
            houseNumber: "13",
            houseNumberAdditional: "a",
            zipcode: "1234AB",
            city: "Heerenveen",
            country: "NL"
        },
        phone: {
            mobile: "0698765433",
            landline: "0109876543"
        },
        email: "test@buckaroo.nl"
    },
    shipping: {
        recipient: {
            category: RecipientCategory.COMPANY,
            careOf: "John Smith",
            companyName: "Buckaroo B.V.",
            firstName: "John",
            lastName: "Do",
            chamberOfCommerce: "12345678"
        },
        address: {
            street: "Kalverstraat",
            houseNumber: "13",
            houseNumberAdditional: "b",
            zipcode: "4321EB",
            city: "Amsterdam",
            country: "NL"
        }
    },
    articles: [
        {
            identifier: "Articlenumber1",
            description: "Blue Toy Car",
            vatPercentage: "21",
            quantity: "2",
            price: "20.10"
        },
        {
            identifier: "Articlenumber2",
            description: "Red Toy Car",
            vatPercentage: "21",
            quantity: "1",
            price: "10.10"
        },
        {
            type: "ShippingFee",
            identifier: "USPShippingID",
            description: "UPS",
            vatPercentage: "21",
            quantity: "1",
            price: "2"
        }
    ]
}