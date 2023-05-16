require('../BuckarooClient.test')
import SEPA from '../../src/PaymentMethods/SEPA'

const sepab2b = new SEPA('b2b')
describe('SEPA', () => {
    test('Pay', async () => {
        await sepab2b
            .pay({
                additionalParameters: undefined,
                amountDebit: 0,
                clientIP: undefined,
                collectDate: '',
                continueOnIncomplete: 0,
                culture: '',
                currency: '',
                customParameters: undefined,
                customerBIC: '',
                customerIBAN: '',
                customeraccountname: '',
                description: '',
                invoice: '',
                mandateDate: '',
                mandateReference: '',
                order: '',
                originalTransactionKey: '',
                originalTransactionReference: '',
                pushURL: '',
                pushURLFailure: '',
                returnURL: '',
                returnURLCancel: '',
                returnURLError: '',
                returnURLReject: '',
                servicesExcludedForClient: '',
                servicesSelectableByClient: '',
                startRecurrent: false
            })
            .then((info) => {
                expect(info).toBeDefined()
            })
    })
    test('Refund', async () => {
        await sepab2b
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: ''
            })
            .then((info) => {
                expect(info).toBeDefined()
            })
    })
    test('Authorize', async () => {
        await sepab2b
            .authorize({
                amountDebit: 0,
                collectDate: '',
                customerIBAN: '',
                customeraccountname: ''
            })
            .then((info) => {
                expect(info).toBeDefined()
            })
    })
    test('PayRecurrent', async () => {
        await sepab2b
            .payRecurrent({
                collectDate: '',
                amountDebit: 50.3,
                originalTransactionKey: ''
            })
            .then((info) => {
                expect(info).toBeDefined()
            })
    })
    test('ExtraInfo', async () => {
        await sepab2b
            .extraInfo({
                amountDebit: 0,
                city: "",
                collectDate: "",
                contractID: "",
                country: "",
                customerIBAN: "",
                customeraccountname: "",
                houseNumberSuffix: "",
                street: "",
                zipcode: ""
            })
            .then((info) => {
                expect(info).toBeDefined()
            })
    })
    test('Emandates', async () => {
        await sepab2b
            .payWithEmandate({
                mandateReference: '',
                amountDebit: 50.3
            })
            .then((info) => {
                expect(info).toBeDefined()
            })
    })
})
