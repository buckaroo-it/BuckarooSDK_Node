import Gender from '../../src/Constants/Gender';
import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';

const method = buckarooClientTest.method('tinka');
describe('Tinka', () => {
    test('Pay', async () => {
        await method
            .pay({
                billing: {
                    email: 'test@buckaroo.nl',
                    phone: {
                        mobile: '0612345678',
                    },
                    address: {
                        street: 'Hoofdstraat',
                        houseNumber: '80',
                        houseNumberAdditional: 'a',
                        zipcode: '8441ER',
                        city: 'Heerenveen',
                        country: 'NL',
                    },
                },
                customer: {
                    gender: Gender.MALE,
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                    initials: 'BA',
                    birthDate: '1990-01-01',
                },
                amountDebit: 100,
                articles: [
                    {
                        type: '1',
                        description: 'Blue Toy Car',
                        brand: 'Ford Focus',
                        manufacturer: 'Ford',
                        color: 'Red',
                        size: 'Small',
                        quantity: 1,
                        price: 3.5,
                        unitCode: 'test',
                    },
                ],
                deliveryDate: '09-07-2020',
                deliveryMethod: 'CompanyStore',
                paymentMethod: 'Credit',
            })
            .request()
            .then((res) => {
                expect(res.isPendingProcessing()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((res) => {
                expect(res.isFailed()).toBeTruthy();
            });
    });
});
