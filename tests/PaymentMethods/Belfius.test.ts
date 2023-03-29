import {BuckarooError} from "../../src/Utils/BuckarooError";

require('../BuckarooClient.test')
import Belfius from '../../src/PaymentMethods/Belfius/index'

const method = Belfius()

describe('testing methods', () => {
    test('Pay Simple Payload', async () => {
        await method
            .pay({
                amountDebit: 10
            })
            .then((data) => {
                expect(data).toBeDefined()
            }).catch((err) => {
                expect(err instanceof BuckarooError).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 5,
                originalTransactionKey: '86CFE2CB5901463EADE061633BDB9EC8'
            })
            .then((data) => {
                expect(data).toBeDefined()
            }).catch((err) => {
                expect(err instanceof BuckarooError).toBeTruthy()
            })
    })
    test('Specifications', async () => {
        await method.specification().then((data) => {
            expect(data).toBeDefined()
        })
    })
})
