import { Gender, PaymentMethodInstance } from '../../src';
import { IReserve } from '../../src/PaymentMethods/KlarnaKP/Models/IReserve';
import buckarooClientTest from '../BuckarooClient';
import { createBasePayload } from '../Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

let method: PaymentMethodInstance<'klarnakp'>;

beforeEach(() => {
    method = buckarooClientTest.method('klarnakp');
});

describe('KlarnaKp', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(190));

        const response = await method
            .pay({
                amountDebit: 100.3,
                reservationNumber: '6c24888a-24ba-42bf-be19-7ceec6f0ee23',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Reserve', async () => {
        mockResponse(transactionResponse(791), '/json/DataRequest');

        const response = await method
            .reserve(
                createBasePayload<IReserve>(
                    {
                        clientIP: '203.0.113.10',
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
        mockResponse(transactionResponse(190), '/json/DataRequest');

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

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});

test('update builds the UpdateReservation request', async () => {
    mockResponse(transactionResponse(), '/json/DataRequest');
    const result = await method.update({ originalTransactionKey: 'test-original' }).request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'UpdateReservation' })]),
                },
            }),
        }),
    ]);
});

test('extend builds the ExtendReservation request', async () => {
    mockResponse(transactionResponse(), '/json/DataRequest');
    const result = await method.extend({ originalTransactionKey: 'test-original' }).request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'ExtendReservation' })]),
                },
            }),
        }),
    ]);
});

test('addShippingInfo builds the AddShippingInfo request', async () => {
    mockResponse(transactionResponse(), '/json/DataRequest');
    const result = await method.addShippingInfo({ originalTransactionKey: 'test-original' }).request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'AddShippingInfo' })]),
                },
            }),
        }),
    ]);
});
