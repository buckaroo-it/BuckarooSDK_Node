require('../BuckarooClient.test')
import Marketplaces from '../../src/PaymentMethods/Marketplaces'
import Ideal from '../../src/PaymentMethods/Ideal'
const marketplaces = new Marketplaces()
const ideal = new Ideal()

describe('Testing Marketplaces methods', () => {
    test('Split', async () => {
        marketplaces.split({
            daysUntilTransfer: 2,
            marketplace: {
                amount: 10,
                description: ''
            },
            seller: [
                {
                    accountId: '789C60F316D24B088ACD471',
                    amount: 50,
                    description: ''
                },
                {
                    accountId: '369C60F316D24B088ACD238',
                    amount: 35,
                    description: ''
                }
            ]
        })
        ideal
            .combine(marketplaces)
            .pay({
                issuer: 'ABNANL2A',
                amountDebit: 95.0
            })
            .then((response) => {
                expect(response.data).toBeDefined()
            })
    })
    test('transfer', async () => {
        marketplaces.transfer({ originalTransactionKey: 'fwcafgdhgf' }).then((response) => {
            expect(response.data).toBeDefined()
        })
    })
    test('refundSupplementary', async () => {
        const market = marketplaces.refundSupplementary()
        ideal
            .combine(market)
            .refund({ originalTransactionKey: 'dasda', amountCredit: 10 })
            .then((response) => {
                expect(response.data).toBeDefined()
            })
    })
})
