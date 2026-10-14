import { PaymentMethodInstance } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'idin'>;

beforeEach(() => {
    method = buckarooClientTest.method('idin');
});

describe('Idin methods', () => {
    test('Verify', async () => {
        mockResponse(transactionResponse(791), '/json/DataRequest');

        const response = await method
            .verify({
                issuer: 'BANKNL2Y',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });

    test('Identify', async () => {
        mockResponse(transactionResponse(791), '/json/DataRequest');

        const response = await method
            .identify({
                issuer: 'BANKNL2Y',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });

    test('Login', async () => {
        mockResponse(transactionResponse(791), '/json/DataRequest');

        const response = await method
            .login({
                issuer: 'BANKNL2Y',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
