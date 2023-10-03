import buckarooClientTest from '../BuckarooClient.test'

const method = buckarooClientTest.method('visa')

describe('testing methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 10
            })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 5,
                originalTransactionKey: 'F397DA6A251645F8BDD81547B5005B4B'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('Authorize', async () => {
        await method
            .authorize({
                amountDebit: 10
            })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeTruthy()
            })
    })
    test('PayEncrypted', async () => {
        await method
            .payEncrypted({
                amountDebit: 10,
                name: 'Visa',
                encryptedCardData: ''
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy()
            })
    })
    test('PayWithSecurityCode', async () => {
        await method
            .payWithSecurityCode({
                amountDebit: 10,
                encryptedSecurityCode: 'sad',
                name: 'Visa'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('AuthorizeWithSecurityCode', async () => {
        await method
            .authorizeWithSecurityCode({
                amountDebit: 10,
                encryptedSecurityCode: 'sad',
                name: 'Visa'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('AuthorizeEncrypted', async () => {
        await method
            .authorizeEncrypted({
                amountDebit: 10,
                encryptedCardData: 'sad',
                name: 'Visa'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('CancelAuthorize', async () => {
        await method
            .cancelAuthorize({
                originalTransactionKey: 'sad',
                amountCredit: 10,
                name: 'Visa'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('Capture', async () => {
        await method
            .capture({
                originalTransactionKey: 'sad',
                amountDebit: 10,
                name: 'Visa'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('PayRecurrent', async () => {
        await method
            .payRecurrent({
                originalTransactionKey: 'sad',
                amountDebit: 10,
                name: 'Visa'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
})
