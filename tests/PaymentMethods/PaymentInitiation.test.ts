import {ReplyHandler} from "../../src/Handlers/Reply/ReplyHandler";

require('../BuckarooClient.test')
import PaymentInitiation from '../../src/PaymentMethods/PaymentInitiation'
import buckarooClient from "../../src/BuckarooClient";

const payByBank = new PaymentInitiation()

describe('PaymentInitiation methods', () => {
    test('Pay', async () => {
        await payByBank
            .pay({
                amountDebit: 50.3,
                order: '123456',
                issuer: 'INGBNL2A',
                countryCode: 'NL'
            })
            .then((response) => {
                const replyHandler = new ReplyHandler(buckarooClient().getCredentials(),
                    response.data, response.axiosResponse.headers["authorization"],
                    response.axiosResponse.config.url)
                replyHandler.validate()
                expect(replyHandler.isValid).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await payByBank
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: '123456'
            })
            .then((info) => {
                expect(info.data).toBeDefined()
            })
    })
})
