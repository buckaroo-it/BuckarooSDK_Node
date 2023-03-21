import { initializeBuckarooClient } from '../BuckarooClient'
import CreditManagement from '../PaymentMethods/CreditManagement'
import { IInvoice } from '../PaymentMethods/CreditManagement/Models/Invoice'
import Gender from '../Constants/Gender'
import ideal from '../PaymentMethods/Ideal/index'
import CreditManagementInstallmentInterval from '../Constants/CreditManagementInstallmentInterval'

initializeBuckarooClient()

const creditManagement = CreditManagement()

describe('Testing Credit Management', () => {
    test('CreateInvoice', async () => {
        await creditManagement.createInvoice(invoice()).then((data) => {
            expect(data).toBeDefined()
            console.log(JSON.stringify(data))
        })
    })

    test('Pause Invoice', async () => {
        await creditManagement.pauseInvoice({ invoice: 'd42' }).then((data) => {
            expect(data).toBeDefined()
            console.log(JSON.stringify(data))
        })
    })
    test('Debtor Info', async () => {
        await creditManagement
            .debtorInfo({
                debtor: {
                    code: 'adsad'
                }
            })
            .then((data) => {
                expect(data).toBeDefined()
                console.log(JSON.stringify(data))
            })
    })
    test('Invoice Info', async () => {
        await creditManagement
            .invoiceInfo({
                invoice: 'invoice1',
                invoices: [
                    {
                        invoiceNumber: 'invoice2'
                    },
                    {
                        invoiceNumber: 'invoice3'
                    }
                ]
            })
            .then((data) => {
                expect(data).toBeDefined()
                console.log(JSON.stringify(data))
            })
    })
    test('UnPause Invoice', async () => {
        await creditManagement.unpauseInvoice({ invoice: 'd42' }).then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('AddOrUpdateProductLines', async () => {
        await creditManagement
            .addOrUpdateProductLines({
                invoiceKey: 'd42',
                articles: [
                    {
                        type: 'Regular',
                        identifier: 'Articlenumber1',
                        description: 'Blue Toy Car',
                        vatPercentage: 21,
                        totalVat: 12,
                        totalAmount: 123,
                        quantity: 2,
                        price: 20.1
                    },
                    {
                        type: 'Regular',
                        identifier: 'Articlenumber2',
                        description: 'Red Toy Car',
                        vatPercentage: 21,
                        totalVat: 12,
                        totalAmount: 123,
                        quantity: 1,
                        price: 10.1
                    }
                ]
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('resumeDebtorFile', async () => {
        await creditManagement.resumeDebtorFile({ debtorFileGuid: 'd42' }).then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('pauseDebtorFile', async () => {
        await creditManagement.pauseDebtorFile({ debtorFileGuid: 'd42' }).then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('CreateCombinedInvoice', async () => {
        const ideal1 = ideal()
        ideal1.setPayload({
            amountDebit: 10.1,
            issuer: 'ABNANL2A'
        })
        const combined = creditManagement.createCombinedInvoice(invoice()).combine(ideal1)

        await ideal1.combine(combined).pay()
    })
    test('CreatePaymentPlan', async () => {
        await creditManagement
            .createPaymentPlan({
                dossierNumber: '',
                includedInvoiceKey: '',
                initialAmount: 0,
                installmentAmount: 0,
                installmentCount: 0,
                interval: CreditManagementInstallmentInterval.MONTH,
                paymentPlanCostAmount: 0,
                paymentPlanCostAmountVat: 0,
                recipientEmail: '',
                startDate: ''
            })
            .then((data) => {
                expect(data).toBeDefined()
                console.log(JSON.stringify(data))
            })
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
                identifier: 'ART2',
                description: 'Red Toy Car',
                quantity: 3,
                unitOfMeasurement: 'piece(s)',
                price: 15,
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
