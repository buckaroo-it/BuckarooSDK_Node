import buckarooClientTest from '../BuckarooClient';
import { mockResponse, recordedRequests, transactionResponse } from '../Utils/HttpMock';

const method = buckarooClientTest.method('surepay');

describe('SurePay methods', () => {
    test('Verify', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method
            .verify({
                currency: '',
                amountDebit: 100.3,
                bankAccount: {
                    iban: 'NLXXTESTXXXXXXXXXX',
                    accountName: 'Test Acceptatie',
                },
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
