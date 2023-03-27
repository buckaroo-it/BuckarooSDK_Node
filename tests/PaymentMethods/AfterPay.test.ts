require('../BuckarooClient.test')
import Afterpay from '../../src/PaymentMethods/Afterpay/index'
import RecipientCategory from '../../src/Constants/RecipientCategory'
import { uniqid } from '../../src/Utils/Functions'

const method = Afterpay()

describe('AfterPay methods', () => {
    test('Pay', async () => {
       await method.pay({
           amountDebit: 7,
           clientIP: '127.0.0.1',
           articles: [
               {
                   description: "ter",
                   grossUnitPrice: 7,
                   identifier: "423f",
                   imageUrl: "",
                   quantity: 1,
                   type: 'Unknown',
                   unitCode: "",
                   url: "",
                   vatPercentage: 0
               },
               {
                   description: "ter",
                   grossUnitPrice: 7,
                   identifier: "423f",
                   quantity: 1,
                   vatPercentage: 0
               }
           ],
           bankAccount: "",
           bankCode: "",
           billing: {
               birthDate: "",
               careOf: "",
               category: RecipientCategory.PERSON,
               city: "",
               conversationLanguage: undefined,
               country: undefined,
               customerNumber: "",
               email: "",
               firstName: "",
               identificationNumber: "",
               lastName: "",
               mobilePhone: "",
               phone: "",
               postalCode: "",
               salutation: undefined,
               street: "",
               streetNumber: "",
               streetNumberAdditional: ""
           },
           merchantImageUrl: "",
           ourReference: "",
           shipping: undefined,
           summaryImageUrl: "",
           yourReference: "",
       }).then((data) => {
            expect(data).toBeDefined()
        })
    });
    test('Refund', async () => {
        method.specification().then((data) => {
            expect(data).toBeDefined()
            console.log(data.getActionRequestParameters('refund'))
        })
    })
    test('Authorize', async () => {
        // await method.authorize().then((data) => {
        //     expect(data).toBeDefined()
        // })
    })
    test('CancelAuthorize', async () => {
        // method.setRequest(payload)
        // await method.cancelAuthorize().then((data) => {
        //     expect(data).toBeTruthy()
        // })
    })

    test('Capture', async () => {
        await method
            .capture({
                amountDebit: 0,
                invoice: '123456789',
                originalTransactionKey: '123456789',
                articles:[
                    {
                        description: "",
                        grossUnitPrice: 0,
                        identifier: "",
                        imageUrl: "",
                        marketPlaceSellerId: "",
                        quantity: 0,
                        refundType: undefined,
                        type: undefined,
                        unitCode: "",
                        url: "",
                        vatPercentage: 0

                    }
                ]
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
})
