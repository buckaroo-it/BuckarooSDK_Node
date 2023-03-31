import { BuckarooError } from '../../src/Utils/BuckarooError'

require('../BuckarooClient.test')
import BanContact from '../../src/PaymentMethods/Bancontact/index'

const method = BanContact()

describe('BanContact methods', () => {
    test('Pay Simple Payload', async () => {
        await method
            .pay({
                amountDebit: 10,
                saveToken: true
            })
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeTruthy()
            })
            .catch((err) => {
                expect(err instanceof BuckarooError).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 5,
                originalTransactionKey: 'F397DA6A251645F8BDD81547B5005B4B'
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
            .catch((err) => {
                expect(err instanceof BuckarooError).toBeTruthy()
            })
    })
    test('Authenticate', async () => {
        await method.authenticate({ amountDebit: 10 }).then((data) => {
            expect(data.isWaitingOnUserInput()).toBeDefined()
        })
    })
    test('PayOneClick', async () => {
        await method
            .payOneClick({
                originalTransactionKey: 'dsad',
                amountDebit: 12
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
            .catch((err) => {
                expect(err instanceof BuckarooError).toBeTruthy()
            })
    })
    test('CompletePayment', async () => {
        await method
            .completePayment({
                originalTransactionKey: 'dsad',
                encryptedCardData: 'sUIB'
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
            .catch((err) => {
                expect(err instanceof BuckarooError).toBeTruthy()
            })
    })
    test('PayEncrypted', async () => {
        await method
            .payEncrypted({
                amountDebit: 10,
                encryptedCardData: 'yrtgdd'
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
            .catch((err) => {
                expect(err instanceof BuckarooError).toBeTruthy()
            })
    })
    test('PayRecurring', async () => {
        await method
            .payRecurring({
                amountDebit: 10,
                originalTransactionKey: 'sadas'
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
            .catch((err) => {
                expect(err instanceof BuckarooError).toBeTruthy()
            })
    })
    test('Specifications', async () => {
        await method
            .specification()
            .then((data) => {
                expect(data).toBeDefined()
            })
            .catch((err) => {
                expect(err instanceof BuckarooError).toBeTruthy()
            })
    })
})
