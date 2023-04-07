import {IPay} from "../../src/PaymentMethods/Klarna/Models/Pay";

require('../BuckarooClient.test')
import Klarna from '../../src/PaymentMethods/Klarna/index'
import { uniqid } from '../../src/Utils/Functions'

const klarna = new Klarna()

describe('Testing Klarna methods', () => {

    test('Pay', async () => {
        await klarna
            .pay(payload)
            .then((res) => {
                expect(res).toBeDefined()
            })
    })
    test('Refund', async () => {
        await klarna
            .refund({
                amountCredit: 21,
                originalTransactionKey: ''
            })
            .then((res) => {
                expect(res).toBeDefined()
            })
    })
    test('payInInstallments', async () => {
        // await klarna.payInInstallments().then((res) => {
        //     expect(res).toBeDefined()
        //     console.log(res.find('parameterErrors'))
        // })
    })
})

let payload:IPay = {
    order: uniqid(),
    amountDebit: 50.3,
    invoice: uniqid(),
    additionalParameters: undefined,
    articles: [],
    billingCustomer: undefined,
    clientIP: undefined,
    continueOnIncomplete: "",
    culture: "",
    currency: "",
    customParameters: undefined,
    description: "",
    originalTransactionKey: "",
    originalTransactionReference: "",
    pushURL: "",
    pushURLFailure: "",
    returnURL: "",
    returnURLCancel: "",
    returnURLError: "",
    returnURLReject: "",
    servicesExcludedForClient: "",
    servicesSelectableByClient: "",
    shippingCustomer: undefined,
    startRecurrent: false
}
