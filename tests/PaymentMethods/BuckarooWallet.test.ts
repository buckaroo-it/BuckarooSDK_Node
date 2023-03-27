require('../BuckarooClient.test')
import BuckarooWallet from '../../src/PaymentMethods/BuckarooWallet/index'

const method = BuckarooWallet()

describe('BuckarooWallet methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                invoice: 'string',
                amountDebit: 12,
                walletId: '2'
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                invoice: 'string',
                walletId: '2',
                amountCredit: 12,
                originalTransactionKey: ''
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
    test('CancelReservation', async () => {
        await method
            .cancel({
                invoice: 'dsadsadsa',
                walletMutationGuid: '2'
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
    test('deposit', async () => {
        await method
            .deposit({
                invoice: 'string',
                walletId: '',
                amountCredit: 12,
                originalTransactionKey: ''
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
    test('Withdrawal', async () => {
        await method
            .withdrawal({
                invoice: 'dasd',
                walletId: '654dfcvb',
                amountDebit: 10,
                originalTransactionKey: ''
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
    test('Create Wallet', async () => {
        await method
            .create({
                invoice: 'sdf',
                walletId: '12',
                originalTransactionKey: '',
                email: '42@hotmail.com',
                bankAccount: {
                    iban: ''
                },
                customer: {
                    firstName: '',
                    lastName: ''
                }
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
})
