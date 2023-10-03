require('../BuckarooClient.test')

import Thunes from '../../src/PaymentMethods/Thunes'

const thunes = new Thunes()

describe('Thunes methods', () => {
    test('authorize', async () => {
        thunes.authorize({ amountDebit: 0 }).then((res) => {
            expect(res.data).toBeDefined()
        })
    })
    test('capture', async () => {
        thunes.capture({ amountDebit: 0, originalTransactionKey: '1' }).then((res) => {
            expect(res.data).toBeDefined()
        })
    })
    test('getStatus', async () => {
        thunes.getStatus({ originalTransactionKey: '111111111111' }).then((res) => {
            expect(res.data).toBeDefined()
        })
    })
    test('cancel', async () => {
        thunes.cancel({ originalTransactionKey: '111111111111' }).then((res) => {
            expect(res.data).toBeDefined()
        })
    })
})
