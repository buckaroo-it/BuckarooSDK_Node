import Buckaroo from '../../src';
import { assertAllRequestsConsumed, mockResponse, resetRequests } from './HttpMock';

describe('Testing mock request verification', () => {
    test.each(['unexpected', 'path', 'method'])('records a swallowed %s failure for teardown', async (kind) => {
        const client = new Buckaroo({ websiteKey: 'test-store', secretKey: 'test-secret' });
        if (kind === 'path') mockResponse({}, '/wrong-path', 'GET');
        if (kind === 'method') mockResponse({}, '/json/Transaction/Specification/ideal', 'POST');
        expect(await client.confirmCredentials()).toBe(false);
        expect(() => assertAllRequestsConsumed()).toThrow();
        resetRequests();
    });
    test('rejects a response fixture that was never consumed', () => {
        mockResponse({});
        expect(() => assertAllRequestsConsumed()).toThrow();
        resetRequests();
    });
});
