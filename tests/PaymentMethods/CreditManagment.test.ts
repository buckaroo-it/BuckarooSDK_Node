import { IInvoice } from '../../src/PaymentMethods/CreditManagement/Models/Invoice'
import Gender from '../../src/Constants/Gender'
import CreditManagementInstallmentInterval from '../../src/Constants/CreditManagementInstallmentInterval'
import buckarooClientTest from '../BuckarooClient.test'
import { uniqid } from '../../src/Utils/Functions'

const creditManagement = buckarooClientTest.method('CreditManagement3')

describe('Testing Credit Management', () => {
    test('CreateInvoice', async () => {
        await creditManagement
            .createInvoice(creditManagementTestInvoice())
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy()
            })
    })
    test('CreateInvoice With Articles', async () => {
        await creditManagement
            .createInvoice(
                creditManagementTestInvoice({
                    invoice: 'Billingtest101',
                    description: 'buckaroo_schema_test_PDF',
                    invoiceAmount: 217.8,
                    invoiceDate: '2022-01-01',
                    dueDate: '1990-01-01',
                    schemeKey: '2amq34',
                    poNumber: 'PO-12345',
                    debtor: {
                        code: 'johnsmith4'
                    },
                    articles: [
                        {
                            productGroupName: 'Toys',
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
                            productGroupName: 'Toys',
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
                    ]
                })
            )
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy()
            })
    })
    test('Pause Invoice', async () => {
        await creditManagement
            .pauseInvoice({ invoice: 'Testinvoice184915' })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy()
            })
    })
    test('UnPause Invoice', async () => {
        await creditManagement
            .unpauseInvoice({ invoice: 'Testinvoice184915' })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy()
            })
    })
    test('Invoice Info', async () => {
        await creditManagement
            .invoiceInfo({
                invoice: 'INV001',
                invoices: [{ invoiceNumber: 'INV002' }, { invoiceNumber: 'INV003' }]
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy()
            })
    })
    test('Debtor Info', async () => {
        await creditManagement
            .debtorInfo({
                debtor: {
                    code: 'TestDebtor123123'
                }
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy()
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
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy()
            })
    })
    test('resumeDebtorFile', async () => {
        await creditManagement
            .resumeDebtorFile({ debtorFileGuid: 'd42' })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy()
            })
    })
    test('pauseDebtorFile', async () => {
        await creditManagement
            .pauseDebtorFile({ debtorFileGuid: 'd42' })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy()
            })
    })
    test('addOrUpdateDebtor', async () => {
        await creditManagement
            .addOrUpdateDebtor(
                creditManagementTestInvoice({
                    addressUnreachable: false,
                    emailUnreachable: false,
                    mobileUnreachable: false
                })
            )
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy()
            })
    })
    test('CreateCombinedInvoice', async () => {
        const combinedInvoice = creditManagement.createCombinedInvoice(
            creditManagementTestInvoice()
        )
        buckarooClientTest
            .method('sepadirectdebit')
            .combine(combinedInvoice.data)
            .pay({
                iban: 'NL39RABO0300065264',
                bic: 'RABONL2U',
                mandateReference: 'TestMandateReference',
                mandateDate: '2020-01-01',
                collectDate: '2020-07-03',
                amountDebit: 10.1,
                customer: {
                    name: 'John Smith'
                },
                invoice: uniqid('TestInvoice')
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy()
            })
    })
    test('CreatePaymentPlan', async () => {
        await creditManagement
            .createPaymentPlan({
                description: 'Payment in two intstallments',
                includedInvoiceKey: '20D09973FB5C4DBC9A33DB0F4F707xxx',
                dossierNumber: 'PaymentplanJohnsmith123',
                installmentCount: 2,
                initialAmount: 100,
                startDate: '2030-01-01',
                interval: CreditManagementInstallmentInterval.MONTH,
                paymentPlanCostAmount: 3.5,
                paymentPlanCostAmountVat: 1.2,
                recipientEmail: 'test@buckaroo.nl'
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy()
            })
    })
    test('pauseInvoice', async () => {
        await creditManagement
            .pauseInvoice({
                invoice: 'd42'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
})
export const creditManagementTestInvoice = (append: object = {}): IInvoice => {
    return {
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
        ...append
    }
}
