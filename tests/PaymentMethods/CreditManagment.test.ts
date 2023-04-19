require('../BuckarooClient.test')

import CreditManagement from '../../src/PaymentMethods/CreditManagement/index'
import { IInvoice } from '../../src/PaymentMethods/CreditManagement/Models/Invoice'
import Gender from '../../src/Constants/Gender'
import Ideal from '../../src/PaymentMethods/Ideal'
import CreditManagementInstallmentInterval from '../../src/Constants/CreditManagementInstallmentInterval'

const creditManagement = new CreditManagement()

describe('Testing Credit Management', () => {
    test('CreateInvoice', async () => {
        await creditManagement.createInvoice(invoice()).then((data) => {
            expect(data).toBeDefined()
        })
    })

    test('Pause Invoice', async () => {
        await creditManagement.pauseInvoice({ invoice: 'd42' }).then((data) => {
            expect(data).toBeDefined()
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
                article: []
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
        const ideal1 = new Ideal()
        const combined = creditManagement.createCombinedInvoice(invoice())

        await ideal1.combine(combined).pay({
            amountDebit: 10.1,
            issuer: 'ABNANL2A'
        })
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
            })
    })
    test('Specifications', async () => {
        //
        await creditManagement
            .pauseInvoice({
                invoice: 'd42'
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
})

const invoice = (append: object = {}): IInvoice => {
    return {
        code: 'Billingtest101',
        // invoiceNumber: 'd42',
        description: 'buckaroo_schema_test_PDF',
        currency: 'EUR',
        applyStartRecurrent: false,
        invoiceAmount: 10,
        invoiceAmountVAT: 1,
        invoiceDate: '2022-01-01',
        dueDate: '2030-01-01',
        schemeKey: 'ezf7xn',
        // maxStepIndex: 1,
        allowedServices: 'ideal,mastercard',
        debtor: {
            code: 'johnsmith4'
        },
        email: { email: 'youremail@example.nl' },
        phone: {
            mobile: '06198765432',
            landline: '06198765432',
            fax: '06198765432'
        },
        person: {
            culture: 'nl-NL',
            title: 'Msc',
            initials: 'JS',
            firstName: 'Test',
            lastNamePrefix: 'Jones',
            lastName: 'Aflever',
            gender: Gender.MALE,
            birthDate: '',
            placeOfBirth: ''
        },
        company: {
            culture: 'nl-NL',
            name: 'My Company Corporation',
            vatApplicable: true,
            vatNumber: 'NL140619562B01',
            chamberOfCommerce: ''
        },
        address: {
            street: 'Hoofdtraat',
            houseNumber: '90',
            houseNumberSuffix: 'A',
            postalCode: '8441ER',
            city: 'Heerenveen',
            state: 'Friesland',
            country: 'NL'
        },
        productLine: [
            {
                discountPercentage: 0,
                productGroupName: '',
                productGroupOrderIndex: 0,
                productOrderIndex: 0,
                quantity: 0,
                totalAmount: 0,
                totalAmountExVat: 0,
                totalDiscount: 0,
                totalVat: 0,
                type: 'Regular',
                unitOfMeasurement: '',
                vatPercentage: 0,
                pricePerUnit: 0,
                productName: '324'

            }
        ],
        ...append
    }
}
