import { PaymentMethodInstance } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'idealqr'>;

beforeEach(() => {
    method = buckarooClientTest.method('idealqr');
});

describe('Testing IdealQR methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method
            .generate({
                description: 'Test purchase',
                returnURL: 'https://buckaroo.dev/return',
                returnURLCancel: 'https://buckaroo.dev/cancel',
                returnURLError: 'https://buckaroo.dev/error',
                returnURLReject: 'https://buckaroo.dev/reject',
                minAmount: 0.1,
                maxAmount: 10.0,
                imageSize: 2000,
                purchaseId: 'Testpurchase123',
                isOneOff: false,
                amount: 1.0,
                amountIsChangeable: true,
                expiration: '2030-09-30',
                isProcessing: false,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
