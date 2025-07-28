import buckarooClientTest from '../BuckarooClient.test';
import { Gender, getIPAddress, PaymentMethodInstance, uniqid } from '../../src';
import { createBasePayload } from '../Payloads';
import { IReserve } from '../../src/PaymentMethods/KlarnaKP/Models/IReserve';

let method: PaymentMethodInstance<'klarnakp'>;

beforeEach(() => {
    method = buckarooClientTest.method('klarnakp');
});

describe('KlarnaKp', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 100.3,
                reservationNumber: '6c24888a-24ba-42bf-be19-7ceec6f0ee23',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test.only('Reserve', async () => {
        const response = await method
            .reserve(
                createBasePayload<IReserve>(
                    {
                        clientIP: getIPAddress(),
                        gender: Gender.MALE,
                        operatingCountry: 'NL',
                        pno: '01011990',
                    },
                    {
                        billing: {
                            exclude: [
                                'state',
                                'lastNamePrefix',
                                'placeOfBirth',
                                'title',
                                'phone',
                                'initials',
                                'culture',
                            ],
                        },
                        shipping: {
                            exclude: [
                                'state',
                                'lastNamePrefix',
                                'placeOfBirth',
                                'title',
                                'phone',
                                'initials',
                                'culture',
                            ],
                        },
                        articles: {
                            exclude: ['type', 'unitCode', 'vatCategory'],
                        },
                    }
                )
            )
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Cancel', async () => {
        return method
            .cancel({
                reservationNumber: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
});
