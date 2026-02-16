import buckarooClientTest from '../BuckarooClient.test';
import { Gender, getIPAddress, PaymentMethodInstance, IRefundRequest } from '../../src';
import { createBasePayload, createRefundPayload } from '../Payloads';
import { IReserve } from '../../src/PaymentMethods/Klarna/Models/IReserve';

let method: PaymentMethodInstance<'klarna'>;

beforeEach(() => {
    method = buckarooClientTest.method('klarna');
});

describe('Klarna', () => {
    test('Reserve', async () => {
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
    test('UpdateReservation', async () => {
        const response = await method
            .update(
                createBasePayload<IReserve>(
                    {
                        dataRequestKey: 'AE5A22C01A1D445EB92360FBFD58F94D',
                    },
                    {
                        billing: false,
                        shipping: {
                            overrides: {
                                email: 'updatedemail@test.com',
                            },
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
                            overrides: [
                                {
                                    description: 'Updated Article',
                                    vatPercentage: 21,
                                    identifier: 'updated-article-1',
                                    price: 50.00,
                                    quantity: 1,
                                },
                            ],
                            exclude: ['type', 'unitCode', 'vatCategory'],
                        },
                    }
                )
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('ExtendReservation', async () => {
        const response = await method
            .extend({
                dataRequestKey: 'AE5A22C01A1D445EB92360FBFD58F94D',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Cancel', async () => {
        const response = await method
            .cancel({
                dataRequestKey: 'A3BB182AAB954DA49BE4BFBD61271D38',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 100.3,
                dataRequestKey: '9814BB351CDA46A28E0CF78EBC9C8491',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Pay with Shipping Info', async () => {
        const response = await method
            .pay({
                amountDebit: 100.3,
                dataRequestKey: 'E5BE39D84FA44DE1BF78EEED128B2BB7',
                shippingInfo: {
                    company: 'Buckaroo',
                    trackingNumber: '123456789',
                    shippingMethod: 'Default',
                },
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '618024D9C4DF4CFAA018F5F7707E973B',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
