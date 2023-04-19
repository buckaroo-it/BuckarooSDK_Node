require('../BuckarooClient.test')
import Tinka from '../../src/PaymentMethods/Tinka/index'

const method = new Tinka()

describe('Tinka', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 3.5,
                article: [
                    {
                        description: 'ewf',
                        quantity: 1,
                        unitCode: '',
                        unitGrossPrice: 3.5
                    }
                ],
                billingCustomer: {
                    city: 'wef',
                    country: 'rfew',
                    email: 'few@hotmail.com',
                    phone: '3161234567',
                    postalCode: '345445',
                    prefixLastName: 'fsd',
                    street: 'ds',
                    streetNumber: '32',
                    streetNumberAdditional: 'descs'
                },
                dateOfBirth: '',
                deliveryDate: '',
                deliveryMethod: 'CompanyStore',
                firstName: '323',
                initials: '',
                lastName: '54',
                paymentMethod: 'Credit'
            })
            .then((info) => {
                expect(info.data).toBeDefined()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 3.5,
                originalTransactionKey: '1234567890'
            })
            .then((info) => {
                expect(info).toBeDefined()
            })
    })

    test('Specifications', async () => {
        await method.specification().then((info) => {
            expect(info).toBeDefined()
        })
    })
})
