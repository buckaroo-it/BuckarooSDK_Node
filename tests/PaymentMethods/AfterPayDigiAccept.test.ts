import { RequestTypes } from '../../src/Constants/Endpoints'
import { TestBilling } from '../Models'
import buckarooClientTest from '../BuckarooClient.test'
import { uniqid } from '../../src/Utils/Functions'
import Gender from '../../src/Constants/Gender'
import { IPay } from '../../src/PaymentMethods/AfterpayDigiAccept/Model/Pay'

const method = buckarooClientTest.method('afterpaydigiaccept')

describe('AfterPayDigiAccept methods', () => {
    test('Authorize', async () => {
        await method
            .authorize({
                amountDebit: 0,
                articles: [],
                bankAccount: '',
                bankCode: '',
                billing: TestBilling,
                clientIP: '',
                merchantImageUrl: '',
                ourReference: '',
                summaryImageUrl: '',
                yourReference: ''
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('Pay', async () => {
        await method
            .pay({ ...paymentPayload, clientIP: '127.0.0.1' })
            .request()
            .then((data) => {
                expect(data.data).toBeDefined()
            })
    })
    test('Specification', async () => {
        await method
            .specification(RequestTypes.Transaction)
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
})

const paymentPayload: IPay = {
    amountDebit: 40.5,
    b2b: true,
    addressesDiffer: true,
    customerIPAddress: '0.0.0.0',
    shippingCosts: 0.5,
    costCentre: 'Test',
    department: 'Test',
    establishmentNumber: 123456,
    billing: {
        recipient: {
            gender: Gender.FEMALE,
            initials: 'AB',
            lastName: 'Do',
            birthDate: '1990-01-01',
            culture: 'NL'
        },
        address: {
            street: 'Hoofdstraat',
            houseNumber: '13',
            houseNumberAdditional: 'a',
            zipcode: '1234AB',
            city: 'Heerenveen',
            country: 'NL'
        },
        phone: {
            mobile: '0698765433'
        },
        email: 'test@buckaroo.nl'
    },
    shipping: {
        recipient: {
            culture: 'NL',
            gender: Gender.MALE,
            initials: 'YJ',
            lastName: 'Jansen',
            companyName: 'Buckaroo B.V.',
            birthDate: '1990-01-01',
            chamberOfCommerce: '12345678',
            vatNumber: 'NL12345678'
        },
        address: {
            street: 'Kalverstraat',
            houseNumber: '13',
            houseNumberAdditional: 'b',
            zipcode: '4321EB',
            city: 'Amsterdam',
            country: 'NL'
        },
        phone: {
            mobile: '0698765433'
        },
        email: 'test@buckaroo.nl'
    },
    articles: [
        {
            identifier: uniqid(),
            description: 'Blue Toy Car',
            price: 10.0,
            quantity: 2,
            vatCategory: '1'
        },
        {
            identifier: uniqid(),
            description: 'Red Toy Car',
            price: 10.0,
            quantity: 2,
            vatCategory: '1'
        }
    ]
}
