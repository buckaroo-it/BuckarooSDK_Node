import os from 'os';
import { DataFormatter, getIPAddress, Str, uniqid } from '../../src';

describe('Testing utilities', () => {
    test('formats parameter groups, counts repeated items and preserves false/zero', () => {
        expect(
            DataFormatter.serviceParametersMap(
                {
                    Items: [
                        { Name: 'first', Quantity: 0 },
                        { Name: 'second', Enabled: false },
                    ],
                    Absent: undefined,
                } as any,
                { Items: 'Article' },
                ['Items']
            )
        ).toEqual([
            { name: 'Name', value: 'first', groupType: 'Article', groupID: 1 },
            { name: 'Quantity', value: 0, groupType: 'Article', groupID: 1 },
            { name: 'Name', value: 'second', groupType: 'Article', groupID: 2 },
            { name: 'Enabled', value: false, groupType: 'Article', groupID: 2 },
        ]);
        expect(DataFormatter.parametersMap({ order: '1' }, 'key', 'data')).toEqual([{ key: 'Order', data: '1' }]);
        expect(DataFormatter.parametersReverseMap([{ name: 'Order', value: '1' }])).toEqual({ order: '1' });
        expect(DataFormatter.parametersReverseMap()).toEqual({});
    });
    test('handles casing without treating accents as the same letter', () => {
        expect(Str.ucfirst('hello')).toBe('Hello');
        expect(Str.lcfirst('Hello')).toBe('hello');
        expect(Str.ucfirst('')).toBe('');
        expect(Str.ciEquals('PAY', 'pay')).toBe(true);
        expect(Str.ciEquals('é', 'e')).toBe(false);
        expect(uniqid('invoice-', true)).toMatch(/^invoice-[0-9a-f]+\.\d+$/);
    });
    test('selects an external IPv4 address and falls back when none exists', () => {
        jest.spyOn(os, 'networkInterfaces').mockReturnValue({
            missing: undefined,
            lo: [{ family: 'IPv4', address: '127.0.0.1', internal: true }],
            eth: [
                { family: 'IPv6', address: '::1', internal: true },
                { family: 'IPv4', address: '203.0.113.10', internal: false },
            ],
        } as any);
        expect(getIPAddress()).toBe('203.0.113.10');
        jest.mocked(os.networkInterfaces).mockReturnValue({});
        expect(getIPAddress()).toBe('0.0.0.0');
    });
});
