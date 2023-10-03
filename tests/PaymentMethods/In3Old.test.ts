import buckarooClientTest from '../BuckarooClient.test'
import Gender from '../../src/Constants/Gender'
import RecipientCategory from '../../src/Constants/RecipientCategory'

const capayable = buckarooClientTest.method('capayable')

describe('Testing capayable methods', () => {
    test('Pay', async () => {
        await capayable
            .pay(paymentPayload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await capayable
            .refund({
                amountCredit: 42,
                originalTransactionKey: ''
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy()
            })
    })
    test('PayInInstallments', async () => {
        await capayable
            .payInInstallments(paymentPayload)
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy()
            })
    })
})

const paymentPayload = {
    clientIP: '127.0.0.0',
    description: 'fdsfsdfdsf',
    amountDebit: 32,
    customerType: RecipientCategory.COMPANY,
    invoiceDate: '22-01-2018',
    customer: {
        gender: Gender.FEMALE,
        culture: 'nl-NL',
        initials: 'J.S.',
        lastName: 'Aflever',
        birthDate: '1990-01-01'
    },
    company: {
        companyName: 'My Company B.V.',
        chamberOfCommerce: '123456'
    },
    address: {
        street: 'Hoofdstraat',
        houseNumber: '2',
        houseNumberSuffix: 'a',
        zipcode: '8441EE',
        city: 'Heerenveen',
        country: 'NL'
    },
    email: 'test@buckaroo.nl',
    phone: {
        mobile: '0612345678'
    },
    articles: [
        {
            identifier: '64381664f2f8b',
            price: 10,
            quantity: 1,
            description: 'Blue Toy Car'
        }
    ],
    subtotals: [
        {
            name: 'Verzendkosten',
            value: 2
        }
    ]
}
