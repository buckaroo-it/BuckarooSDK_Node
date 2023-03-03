import { initializeBuckarooClient } from '../BuckarooClient'
import { creditManagement } from '../PaymentMethods/CreditManagement/CreditManagement'
import { IInvoice } from '../PaymentMethods/CreditManagement/Models/Invoice'
import Gender from '../Constants/Gender'

initializeBuckarooClient()

const creditM = creditManagement()
test('CreateInvoice', async () => {
    await creditM.createInvoice(invoice()).then((data) => {
        expect(data).toBeDefined()
        console.log(JSON.stringify(data))
    })
})

test('Pause', async () => {
    await creditM.pauseInvoice({ invoice: 'd42' }).then((data) => {
        expect(data).toBeDefined()
        console.log(JSON.stringify(data))
    })
})
test('Info', async () => {
    await creditM
        .invoiceInfo({
            invoice: 'test'
        })
        .then((data) => {
            expect(data).toBeDefined()
            console.log(JSON.stringify(data))
        })
})

const invoice = (append: object = {}): IInvoice => {
    return {
        code: 'Billingtest101',
        invoiceNumber: '',
        description: 'buckaroo_schema_test_PDF',
        currency: 'EUR',
        applyStartRecurrent: false,
        invoiceAmount: 10,
        invoiceAmountVAT: 1,
        invoiceDate: '2022-01-01',
        dueDate: '2030-01-01',
        schemeKey: '2amq34',
        maxStepIndex: 1,
        allowedServices: 'ideal,mastercard',
        debtor: {
            code: 'johnsmith4'
        },
        email: 'youremail@example.nl',
        phone: {
            mobile: '06198765432'
        },
        person: {
            culture: 'nl-NL',
            title: 'Msc',
            initials: 'JS',
            firstName: 'Test',
            lastNamePrefix: 'Jones',
            lastName: 'Aflever',
            gender: Gender.MALE
        },
        company: {
            culture: 'nl-NL',
            name: 'My Company Corporation',
            vatApplicable: true,
            vatNumber: 'NL140619562B01',
            chamberOfCommerce: '20091741'
        },
        address: {
            street: 'Hoofdtraat',
            houseNumber: '90',
            houseNumberAdditional: 'A',
            zipcode: '8441ER',
            city: 'Heerenveen',
            state: 'Friesland',
            country: 'NL'
        },
        articles: [
            {
                productGroupName: 'Toys1',
                productGroupOrderIndex: 1,
                productOrderIndex: 1,
                type: 'Regular',
                identifier: 'ART12',
                description: 'Blue Toy Car',
                quantity: 3,
                unitOfMeasurement: 'piece(s)',
                price: 10,
                discountPercentage: 20,
                totalDiscount: 6,
                vatPercentage: 21,
                totalVat: 0.6,
                totalAmountExVat: 8.4,
                totalAmount: 123
            },
            {
                productGroupName: 'Toys2',
                productGroupOrderIndex: 1,
                productOrderIndex: 2,
                type: 'Regular',
                identifier: 'ART12',
                description: 'Blue Toy Car',
                quantity: 3,
                unitOfMeasurement: 'piece(s)',
                price: 10,
                discountPercentage: 20,
                totalDiscount: 6,
                vatPercentage: 21,
                totalVat: 0.6,
                totalAmountExVat: 8.4,
                totalAmount: 123
            }
        ],
        ...append
    }
}
