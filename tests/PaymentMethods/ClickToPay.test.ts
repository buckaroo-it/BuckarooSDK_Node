import buckarooClientTest from '../BuckarooClient';
import { mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

const method = buckarooClientTest.method('clicktopay');
describe('Testing ClickToPay methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(790));

        const response = await method
            .pay({
                amountDebit: 0.01,
                continueOnIncomplete: true,
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
