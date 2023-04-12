require('../BuckarooClient.test')
import SEPA from '../../src/PaymentMethods/SEPA/index'

const method = new SEPA()

describe('SEPA', () => {
    test('Pay', async () => {
        await method
            .pay({
                additionalParameters: undefined,
                amountDebit: 0,
                clientIP: undefined,
                collectDate: '',
                continueOnIncomplete: '',
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
        await method
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: ''
            })
            .then((info) => {
                
                expect(info).toBeDefined()
            })
    })
    test('Authorize', async () => {
        await method
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
        await method
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
        await method
            .extraInfo({
                additionalParameters: undefined,
                amountDebit: 0,
                city: '',
                clientIP: undefined,
                collectDate: '',
                continueOnIncomplete: '',
                contractID: '',
                country: '',
                culture: '',
                currency: '',
                customParameters: undefined,
                customerBIC: '',
                customerCode: '',
                customerIBAN: '',
                customerName: '',
                customerReferencePartyCode: '',
                customerReferencePartyName: '',
                customeraccountname: '',
                description: '',
                houseNumber: '',
                houseNumberSuffix: '',
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
                startRecurrent: false,
                street: '',
                zipcode: ''
            })
            .then((info) => {
                
                expect(info).toBeDefined()
            })
    })
    test('Emandate', async () => {
        await method
            .payWithEmandate({
                mandateReference: '',
                amountDebit: 50.3
            })
            .then((info) => {
                expect(info).toBeDefined()
            })
    })
})
