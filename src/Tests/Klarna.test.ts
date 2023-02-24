import { Klarna } from '../PaymentMethods/Klarna/Klarna'
import { uniqid } from '../Utils/Functions'
import { buckarooClient, initializeBuckarooClient} from "../BuckarooClient";
initializeBuckarooClient()

const klarnaTest  = new Klarna()

describe('Testing Klarna methods', () => {
    test('Pay', async () => {
        await klarnaTest.pay({
                currency: buckarooClient().getConfig().currency || '',
                order: uniqid(),
                amountDebit: 50.3,
                invoice: uniqid(),
                billing: {
                    recipient: {
                        category: 'B2C',
                        gender: 'female',
                        firstName: 'John',
                        lastName: 'Do',
                        birthDate: '1990-01-01'
                    },
                    address: {
                        street: 'Hoofdstraat',
                        houseNumber: '13',
                        houseNumberAdditional: 'a',
                        zipcode: '1234AB',
                        city: 'Heerenveen',
                        country: 'GB'
                    },
                    phone: {
                        mobile: '0698765433'
                    },
                    email: 'test@buckaroo.nl'
                },
                shipping: {
                    recipient: {
                        category: 'B2C',
                        gender: 'male',
                        firstName: 'John',
                        lastName: 'Do',
                        birthDate: '1990-01-01'
                    },
                    address: {
                        street: 'Kalverstraat',
                        houseNumber: '13',
                        houseNumberAdditional: 'b',
                        zipcode: '4321EB',
                        city: 'Amsterdam',
                        country: 'GB'
                    },
                    email: 'test@buckaroo.nl'
                },
                articles: [
                    {
                        identifier: 'Articlenumber1',
                        description: 'Blue Toy Car',
                        vatPercentage: 21,
                        quantity: 2,
                        price: 32
                    },
                    {
                        identifier: 'Articlenumber2',
                        description: 'Red Toy Car',
                        vatPercentage: 21,
                        quantity: 1,
                        price: 10.1
                    }
                ]
            }
        ).then((res)=>{
            console.log(res)
            expect(res).toBeDefined()
        })
    })
})
