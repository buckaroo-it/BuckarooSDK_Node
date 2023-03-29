import RecipientCategory from "../../src/Constants/RecipientCategory";
import Billink from '../../src/PaymentMethods/Billink/index'
import Gender from '../../src/Constants/Gender'
import {BuckarooError} from "../../src/Utils/BuckarooError";
import {IPay} from "../../src/PaymentMethods/Billink/Models/Pay";

require('../BuckarooClient.test')

const method = Billink()

describe('testing methods', () => {
    test('Specifications', async () => {
        await method.specification().then((data) => {
            data.getActionRequestParameters('Pay')
            expect(data).toBeDefined()
        })
    })
    test('Pay', async () => {
        await method
            .pay(payload)
            .then((data) => {
                expect(data).toBeDefined()
            }).catch((err) => {
                expect(err instanceof BuckarooError).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 12,
                originalTransactionKey: 'ytgty'
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('Authorize', async () => {
        await method.authorize(payload).then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('CancelAuthorize', async () => {
        await method
            .cancelAuthorize({
                originalTransactionKey: 'ytgty',
                amountCredit: 10,
                invoice: 'sdsa'
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
    test('Capture', async () => {
        await method
            .capture({
                originalTransactionKey: 'ytgty',
                invoice: "'dsa",
                amountDebit: 123
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
})

let payload:IPay = {
    amountDebit: 12,
    articles: [],
    billing: {
        address: {
            city: '',
            country: 'NL',
            houseNumber: '',
            houseNumberAdditional: '',
            street: '',
            zipcode: ''
        },
        email: 'em',
        phone: {
            mobile: 'das'
        },
        recipient: {
            birthDate: '',
            careOf: '',
            category: RecipientCategory.COMPANY,
            chamberOfCommerce: '',
            companyName: '',
            firstName: '',
            gender: Gender.MALE,
            lastName: '',
            title: '',
            vatApplicable: false,
            vatNumber: ''
        }
    }
}