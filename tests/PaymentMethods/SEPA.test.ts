require('../BuckarooClient.test')
import SEPA from '../../src/PaymentMethods/SEPA/index'

const method = SEPA()

describe('SEPA', () => {
    test('Pay', async () => {
        await method
            .pay({
                bic: '',
                collectDate: '',
                customer: {
                    name: 'aaa'
                },
                iban: '423',
                mandateDate: '',
                mandateReference: '',
                amountDebit: 50.3
            })
            .then((info) => {
                console.log(info)

                console.dir(info.find('requestErrors'))
                expect(info).toBeDefined()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: ''
            })
            .then((info) => {
                console.log(info)
                expect(info).toBeDefined()
            })
    })
    test('Authorize', async () => {
        await method
            .authorize({
                bic: '',
                collectDate: '',
                customer: {
                    name: ''
                },
                iban: '',
                mandateDate: '',
                mandateReference: '',
                amountDebit: 50.3
            })
            .then((info) => {
                console.log(info)
                expect(info).toBeDefined()
            })
    })
    test('PayRecurrent', async () => {
        await method
            .payRecurrent({
                collectDate: '',
                amountDebit: 50.3,
                originalTransactionKey: ''
            })
            .then((info) => {
                console.log(info)

                console.dir(info.find('requestErrors'))
                console.log(info.find('actionErrors'))
                expect(info).toBeDefined()
            })
    })
    test('ExtraInfo', async () => {
        await method
            .extraInfo({
                amountDebit: 10,
                invoice: 'testinvoice 123',
                iban: 'NL13TEST0123456789',
                bic: 'TESTNL2A',
                contractID: 'TEST',
                mandateDate: '2022-07-03',
                mandateReference: '1DCtestreference',
                customer: {
                    name: 'John Smith',
                    code: '',
                    referenceParty: {
                        code: '',
                        name: ''
                    }
                },
                address: {
                    street: 'Hoofdstraat',
                    houseNumber: '13',
                    houseNumberAdditional: 'a',
                    zipcode: '1234AB',
                    city: 'Heerenveen',
                    country: 'NL'
                }
            })
            .then((info) => {
                console.log(info)
                expect(info).toBeDefined()
            })
    })
    test('Emandate', async () => {
        await method
            .payWithEmandate({
                mandateReference: '',
                amountDebit: 50.3
            })
            .then((info) => {
                console.log(info)
                console.log(info.find('parameterErrors'))
                expect(info).toBeDefined()
            })
    })
})
