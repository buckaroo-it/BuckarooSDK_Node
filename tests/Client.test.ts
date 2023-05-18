// @ts-ignore
import buckarooClientTest from './BuckarooClient.test'
import {Request} from "../src/Models/Request";




describe('Testing Buckaroo Client', () => {
    test('transactionRequest', async () => {

        const transactionRequest = new Request({})
        buckarooClientTest.request('POST', buckarooClientTest.transactionRequestUrl(), transactionRequest.data)

        await buckarooClientTest.transactionRequest(transactionRequest.data)
            .then((data) => {
            expect(data).toBeDefined()
        })
    })

})
