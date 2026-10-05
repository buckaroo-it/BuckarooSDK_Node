import { Gender, uniqid } from '../../src';
import buckarooClientTest from '../BuckarooClient';
import { mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

const method = buckarooClientTest.method('payperemail');

describe('PayPerEmail methods', () => {
    test('paymentInvitation', async () => {
        mockResponse(transactionResponse(792));

        const response = await method
            .paymentInvitation({
                currency: 'EUR',
                amountDebit: 10,
                order: uniqid(),
                invoice: uniqid(),
                merchantSendsEmail: false,
                email: 'test@buckaroo.nl',
                expirationDate: '2030-01-01',
                paymentMethodsAllowed: 'ideal,mastercard,paypal',
                attachment: '',
                customer: {
                    gender: Gender.FEMALE,
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                },
            })
            .request();
        expect(response.isAwaitingConsumer()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
