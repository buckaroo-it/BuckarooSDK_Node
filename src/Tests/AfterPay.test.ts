import { initializeBuckarooClient } from '../BuckarooClient'
import Afterpay from "../PaymentMethods/Afterpay";
import RecipientCategory from "../Constants/RecipientCategory";
import {uniqid} from "../Utils/Functions";
initializeBuckarooClient()

const method = Afterpay()

describe('testing methods', () => {

    test('Pay Simple Payload', async () => {
        method.setPayload(payload)
        await method.pay().then((data) => {
            expect(data).toBeDefined()
            console.log(data.find('ParameterErrors') || data.find('Parameters'))
        })
    })
    test('Refund', async () => {
        method.setRequest(payload)
        await method.refund({
            amountCredit: 5,
            originalTransactionKey: "",
            articles:[
                {
                    brand: "",
                    description: "",
                    grossUnitPrice: "",
                    identifier: "",
                    imageUrl: "",
                    manufacturer: "",
                    marketPlaceSellerId: "",
                    price: 5,
                    quantity: 1,
                    refundType: 'Return',
                    type: 'PhysicalArticle',
                    unitCode: "",
                    url: "",
                    vatCategory: 0,
                    vatPercentage: 0
                }
            ]
        }).then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('Specifications', async () => {
        await method.specification().then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('Authorize', async () => {
        method.setRequest(payload)
        await method.authorize().then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('CancelAuthorize', async () => {
      method.setRequest(payload)
        await method.cancelAuthorize().then((data) => {
            expect(data ).toBeTruthy()
        })
    })


    test('Capture', async () => {
        await method.capture({
            invoice: '123456789',
            originalTransactionKey: '123456789',
        }).then((data) => {
            expect(data).toBeDefined()
        })
    })
})

const payload = {
    order:uniqid(),
    invoice:uniqid(),
    amountDebit: 52.3,
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            careOf: "John Smith",
            firstName: "John",
            lastName: "Do",
            birthDate: "1990-01-01",
            conversationLanguage: "NL",
            // identificationNumber: "IdNumber12345",
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