import buckarooClientTest from '../BuckarooClient.test';
import Gender from '../../src/Constants/Gender';

const klarnaKp = buckarooClientTest.method('klarnakp');

describe('KlarnaKp', () => {
    test('Pay', async () => {
        await klarnaKp
            .pay({
                amountDebit: 100,
                reservationNumber: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((info) => {
                expect(info.isFailed()).toBeTruthy();
            });
    });
    test('Reserve', async () => {
        await klarnaKp
            .reserve({
                gender: Gender.MALE,
                operatingCountry: 'NL',
                pno: '01011990',
                billing: {
                    recipient: {
                        firstName: 'Test',
                        lastName: 'Acceptatie',
                    },
                    address: {
                        street: 'Hoofdstraat',
                        zipcode: '8441ER',
                        city: 'Heerenveen',
                        country: 'NL',
                    },
                    phone: {
                        mobile: '0612345678',
                    },
                    email: 'test@buckaroo.nl',
                },
                articles: [
                    {
                        identifier: 'Articlenumber1',
                        description: 'Blue Toy Car',
                        vatPercentage: 21,
                        quantity: 2,
                        price: 20.1,
                    },
                    {
                        identifier: 'Articlenumber2',
                        description: 'Red Toy Car',
                        vatPercentage: 21,
                        quantity: 1,
                        price: 10.1,
                    },
                ],
            })
            .then((info) => {
                expect(info.isPendingProcessing()).toBeTruthy();
            });
    });
    test('Cancel', async () => {
        await klarnaKp
            .cancel({
                reservationNumber: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
});
