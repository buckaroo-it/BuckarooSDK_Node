// @ts-ignore
import buckarooClientTest from './BuckarooClient.test'
import {Request} from "../src/Models/Request";




describe('Testing Buckaroo Client', () => {
    test('transactionRequest', async () => {

        const transactionRequest = new Request({
            amountDebit: 100,
            invoice: 'invoice',
            currency: 'EUR',
            description: 'description',
            servicesSelectableByClient: 'ideal,afterpay',
        })
        await buckarooClientTest.transactionRequest(transactionRequest.data)
            .then((data) => {
            expect(data).toBeDefined()
        })
    })

})
