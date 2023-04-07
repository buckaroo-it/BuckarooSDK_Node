import BankTransfer from '../../src/PaymentMethods/BankTransfer'

require('../BuckarooClient.test')

const method = new BankTransfer()

describe('Transfer methods', () => {
    test('Specification', async () => {
        await method.specification().then((res) => {
            console.log(res)
        })
    })
    test('Pay', async () => {
        await method
            .pay({
                additionalParameters: undefined,
                amountDebit: 0,
                clientIP: undefined,
                continueOnIncomplete: '',
                culture: '',
                currency: '',
                customParameters: undefined,
                customerCountry: '',
                customerEmail: '',
                customerFirstName: '',
                customerGender: undefined,
                customerLastName: '',
                dateDue: '',
                description: '',
                invoice: '',
                order: '',
                originalTransactionKey: '',
                originalTransactionReference: '',
                pushURL: '',
                pushURLFailure: '',
                returnURL: '',
                returnURLCancel: '',
                returnURLError: '',
                returnURLReject: '',
                sendMail: false,
                servicesExcludedForClient: '',
                servicesSelectableByClient: '',
                startRecurrent: false
            })
            .then((res) => {
                expect(res.isAwaitingConsumer()).toBeTruthy()
            })
    })
})
