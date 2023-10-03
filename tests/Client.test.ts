import Buckaroo from '../src'
import { TransactionData } from '../src/Request/DataModels'
import { TransactionResponse } from '../src/Models/Response/TransactionResponse'
import { HttpClientResponse } from '../src/Models/Response/HttpClientResponse'
import { uniqid } from '../src/Utils/Functions'
import {creditManagementTestInvoice} from "./PaymentMethods/CreditManagment.test";

require('dotenv').config()

const client = Buckaroo.InitializeClient(
    {
        secretKey: process.env.BPE_SECRET_KEY || '',
        websiteKey: process.env.BPE_WEBSITE_KEY || ''
    },
    {
        mode: process.env.BPE_MODE === 'LIVE' ? 'LIVE' : 'TEST',
        currency: process.env.BPE_CURRENCY_CODE || 'EUR',
        returnURL: process.env.BPE_RETURN_URL || '',
        returnURLCancel: process.env.BPE_RETURN_URL_CANCEL || '',
        pushURL: process.env.BPE_PUSH_URL || ''
    }
)
describe('Testing Buckaroo Client', () => {
    test('Credentials', async () => {
        await client
            .confirmCredentials()
            .then((response) => {
                expect(response).toBeTruthy()
            })
            .catch((err) => {
                expect(err).toBeUndefined()
            })
    })
    test('Batch Transaction', async () => {
        const transactionData: TransactionData[] = []
        for (let i = 0; i < 3; i++) {
            let invoice = client
                .method('CreditManagement3')
                .createCombinedInvoice(creditManagementTestInvoice())
                .combine('sepadirectdebit')
                .pay({
                    invoice: uniqid(),
                    amountDebit: 10.1,
                    iban: 'NL13TEST0123456789',
                    bic: 'TESTNL2A',
                    collectdate: '2024-07-03',
                    mandateReference: '1DCtestreference',
                    mandateDate: '2022-07-03',
                    customer: {
                        name: 'John Smith'
                    }
                }).data
            transactionData.push(invoice)
        }

        await client
            .batch(transactionData)
            .request()
            .then((response) => {
                expect(response).toBeTruthy()
            })
            .catch((err) => {
                expect(err).toBeUndefined()
            })
    })
    describe('Transaction', () => {
        const transactionService = client.transaction('39F3EC520A3F4A25B0A1899D4FF0E1CB')
        test('Transaction Status', async () => {
            await transactionService
                .status()
                .then((res) => {
                    expect(res instanceof TransactionResponse).toBeTruthy()
                })
                .catch((err) => {
                    expect(err).toBeUndefined()
                })
        })
        test('Transaction Cancel Info', async () => {
            await transactionService
                .cancelInfo()
                .then((res) => {
                    expect(res instanceof HttpClientResponse).toBeTruthy()
                })
                .catch((err) => {
                    expect(err).toBeUndefined()
                })
        })

        test('Transaction Refund Info', async () => {
            await transactionService
                .refundInfo()
                .then((res) => {
                    expect(res instanceof HttpClientResponse).toBeTruthy()
                })
                .catch((err) => {
                    expect(err).toBeUndefined()
                })
        })
    })
})
