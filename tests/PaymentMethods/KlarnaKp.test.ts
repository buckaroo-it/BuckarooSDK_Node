import buckarooClientTest from '../BuckarooClient.test'
import gender from '../../src/Constants/Gender'
const klarnaKp = buckarooClientTest.method('klarnakp')

describe('KlarnaKp', () => {
    test('Pay', async () => {
        await klarnaKp
            .pay({
                amountDebit: 50.3,
                reservationNumber: '2377577452'
            })
            .request()
            .then((info) => {
                expect(info.isFailed()).toBeTruthy()
            })
    })
    test('Reserve', async () => {
        await klarnaKp
            .reserve({
                gender: gender.MALE,
                operatingCountry: 'NL',
                pno: '01011990',
                billing: {
                    recipient: {
                        firstName: 'John',
                        lastName: 'Do'
                    },
                    address: {
                        street: 'Neherkade',
                        houseNumber: '1',
                        zipcode: '2521VA',
                        city: 'Gravenhage',
                        country: 'NL'
                    },
                    phone: {
                        mobile: '0612345678'
                    },
                    email: 'youremail@example.nl'
                },
                shipping: {
                    recipient: {
                        firstName: 'John',
                        lastName: 'Do'
                    },
                    address: {
                        street: 'Rosenburglaan',
                        houseNumber: '216',
                        zipcode: '4385 JM',
                        city: 'Vlissingen',
                        country: 'NL'
                    },
                    email: 'test@buckaroo.nl'
                },
                articles: [
                    {
                        identifier: 'Articlenumber1',
                        description: 'Blue Toy Car',
                        vatPercentage: 21,
                        quantity: 2,
                        price: 20.1
                    },
                    {
                        identifier: 'Articlenumber2',
                        description: 'Red Toy Car',
                        vatPercentage: 21,
                        quantity: 1,
                        price: 10.1
                    }
                ],
                additionalParameters: {
                    initiated_by_magento: '1',
                    service_action: 'something'
                }
            })
            .request()
            .then((info) => {
                expect(info.isPendingProcessing()).toBeTruthy()
            })
    })
    test('Cancel', async () => {
        await klarnaKp
            .cancel({})
            .request()
            .then((info) => {
                expect(info).toBeDefined()
            })
    })
})
