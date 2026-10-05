import axios from 'axios';
import net from 'net';
import { assertAllRequestsConsumed, mockAdapter, resetRequests } from './Utils/HttpMock';

// Every Axios instance uses the local adapter unless a test explicitly provides its own.
axios.defaults.adapter = mockAdapter;
// Also block alternate transports, including accidental LIVE configuration.
net.Socket.prototype.connect = function () {
    throw new Error('Network access is disabled in SDK tests');
};
globalThis.fetch = async () => {
    throw new Error('Network access is disabled in SDK tests');
};

jest.useFakeTimers({ now: new Date('2026-01-01T12:00:00Z'), doNotFake: ['nextTick', 'setImmediate'] });
jest.spyOn(Math, 'random').mockReturnValue(0.5);
beforeEach(() => {
    resetRequests();
    jest.useFakeTimers({ now: new Date('2026-01-01T12:00:00Z'), doNotFake: ['nextTick', 'setImmediate'] });
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
});
afterEach(() => {
    assertAllRequestsConsumed();
    jest.restoreAllMocks();
    jest.useRealTimers();
});
