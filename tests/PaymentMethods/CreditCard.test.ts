require('../BuckarooClient.test')
import CreditCard from '../../src/PaymentMethods/CreditCard/index'

const method = new CreditCard()

describe('testing methods', () => {
        test('Pay', async () => {
          await method
            .pay({
              amountDebit: 10,
              name: 'Visa'
            })
            .then((data) => {
              expect(data).toBeDefined()
            })
        })
        test('Refund', async () => {
            await method
                .refund({
                    amountCredit: 5,
                    name: 'Visa',
                    originalTransactionKey: 'F397DA6A251645F8BDD81547B5005B4B'
                })
                .then((data) => {
                    expect(data).toBeDefined()
                })
        })
        test('Authorize', async () => {
            await method
                .authorize({
                    amountDebit: 10,
                    name: 'Visa'
                })
                .then((data) => {
                    expect(data).toBeDefined()
                })
        })
        test('PayEncrypted', async () => {
            await method
                .payEncrypted({
                    amountDebit: 10,
                    name: 'Visa',
                    encryptedCardData: ''
                })
                .then((data) => {
                    expect(data).toBeDefined()
                })
        })
        test('PayWithSecurityCode', async () => {
            await method
                .payWithSecurityCode({
                    amountDebit: 10,
                    encryptedSecurityCode: 'sad',
                    name: 'Visa'
                })
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
                .then((data) => {
                    expect(data).toBeDefined()
                })
        })
})
