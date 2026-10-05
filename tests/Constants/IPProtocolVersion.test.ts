import { Address4, Address6 } from 'ip-address';
import { ClientIP, TransactionData } from '../../src';

describe('Testing IP protocol version', () => {
    afterEach(() => jest.restoreAllMocks());

    test.each([257, 65536])('rejects %i code units before either parser without echoing the input', (length) => {
        const ipv4 = jest.spyOn(Address4, 'isValid');
        const ipv6 = jest.spyOn(Address6, 'isValid');
        const value = '!'.repeat(length);

        for (const create of [() => new ClientIP(value), () => new TransactionData({ clientIP: value })]) {
            expect(create).toThrow(/^IP address exceeds 256 characters$/);
        }
        expect(ipv4).not.toHaveBeenCalled();
        expect(ipv6).not.toHaveBeenCalled();
    });

    test.each([
        ['127.0.0.1', 0],
        ['2001:db8::1', 1],
        ['fe80::1%eth0', 1],
        ['2001:db8::/64', 1],
    ] as const)('preserves the accepted address %s', (address, type) => {
        expect(new ClientIP(address)).toEqual({ address, type });
        expect(new TransactionData({ clientIP: address }).getData().ClientIP).toEqual({ address, type });
    });

    test.each(['!', '!'.repeat(256), '😀'.repeat(128)])(
        'passes bounded malformed input to the parser (%#)',
        (value) => {
            const ipv4 = jest.spyOn(Address4, 'isValid');
            const ipv6 = jest.spyOn(Address6, 'isValid');
            expect(() => new ClientIP(value)).toThrow('Invalid IP address:');
            expect(ipv4).toHaveBeenCalledWith(value);
            expect(ipv6).toHaveBeenCalledWith(value);
        }
    );

    test('counts UTF-16 code units for the length limit', () => {
        const ipv4 = jest.spyOn(Address4, 'isValid');
        const ipv6 = jest.spyOn(Address6, 'isValid');
        expect(() => new ClientIP('😀'.repeat(129))).toThrow(/^IP address exceeds 256 characters$/);
        expect(ipv4).not.toHaveBeenCalled();
        expect(ipv6).not.toHaveBeenCalled();
    });
});
