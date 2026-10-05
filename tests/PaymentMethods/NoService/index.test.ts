import { uniqid } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

const method = buckarooClientTest.method('noservice');

describe('NoService methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(790));

        const response = await method
            .pay({
                amountDebit: 100,
                invoice: uniqid(),
                servicesSelectableByClient: 'ideal,bancontactmrcash,paypal',
                servicesExcludedForClient: 'mbway',
                continueOnIncomplete: true,
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
