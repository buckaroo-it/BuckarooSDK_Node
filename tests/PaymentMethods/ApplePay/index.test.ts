import { uniqid } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: ReturnType<typeof createMethod>;
const createMethod = () => buckarooClientTest.method('applepay');
beforeEach(() => {
    method = createMethod();
});

describe('Applepay methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(190));

        return method
            .pay({
                amountDebit: 100,
                invoice: uniqid(),
                paymentData: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                customerCardName: 'XXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test('Pay Redirect Payload', async () => {
        mockResponse(transactionResponse(790));

        return method
            .payRedirect({
                amountDebit: 100,
                invoice: uniqid(),
                servicesSelectableByClient: 'applepay',
                continueOnIncomplete: true,
            })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        return method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
