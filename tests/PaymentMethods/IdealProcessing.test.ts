import { PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient';
import { issuerResponse, mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

let method: PaymentMethodInstance<'idealprocessing'>;

beforeEach(() => {
    method = buckarooClientTest.method('idealprocessing');
});
describe('testing Ideal Processing methods', () => {
    test('Issuers', async () => {
        mockResponse(issuerResponse, '/json/Transaction/Specification/idealprocessing', 'GET');

        return method.issuers().then((response) => {
            expect(Array.isArray(response)).toBeTruthy();
        });
    });
    test('Pay Simple Payload', async () => {
        mockResponse(transactionResponse(791));

        const response = await method
            .pay({
                amountDebit: 100,
                issuer: 'ABNANL2A',
                continueOnIncomplete: false,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});

test('payRemainder builds the PayRemainder request', async () => {
    mockResponse(transactionResponse(), '/json/Transaction');
    const result = await method.payRemainder({ amountDebit: 10, issuer: 'ABNANL2A' }).request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'PayRemainder' })]),
                },
            }),
        }),
    ]);
});
