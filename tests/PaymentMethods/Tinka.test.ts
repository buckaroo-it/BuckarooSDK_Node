import Gender from '../../src/Constants/Gender';
import buckarooClientTest from '../BuckarooClient.test';
const method = buckarooClientTest.method('tinka');
describe('Tinka', () => {
    test('Pay', async () => {
        await method
            .pay({
                billing: {
                    recipient: {
                        lastNamePrefix: 'the',
                    },
                    email: 'billingcustomer@buckaroo.nl',
                    phone: {
                        mobile: '0109876543',
                    },
                    address: {
                        street: 'Hoofdstraat',
                        houseNumber: '80',
                        houseNumberAdditional: 'A',
                        zipcode: '8441EE',
                        city: 'Heerenveen',
                        country: 'NL',
                    },
                },
                customer: {
                    gender: Gender.MALE,
                    firstName: 'Buck',
                    lastName: 'Aroo',
                    initials: 'BA',
                    birthDate: '1990-01-01',
                },
                amountDebit: 3.5,
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
                amountCredit: 3.5,
                originalTransactionKey: '1234567890',
            })
            .request()
            .then((res) => {
                expect(res.isFailed()).toBeTruthy();
            });
    });
});
