import { version } from '../../package.json';
import Headers from '../../src/Request/Headers';

describe('Testing request headers', () => {
    test('provides JSON defaults without sharing mutable headers', () => {
        const a = new Headers(),
            b = new Headers();
        expect(a.headers).toMatchObject({
            Accept: 'application/json',
            'Content-type': 'application/json; charset=utf-8',
            Culture: 'nl-NL',
            Channel: 'Web',
        });
        a.setHeaders({ Culture: 'en-US', Extra: 'value' }).removeHeaders({ Extra: '' });
        expect(a.headers.Culture).toBe('en-US');
        expect(a.headers.Extra).toBeUndefined();
        expect(b.headers.Culture).toBe('nl-NL');
    });
    test('formats custom software metadata and preserves defaults', () => {
        const headers = new Headers().setSoftwareHeader({ platformName: 'Shop', moduleVersion: '2' });
        expect(JSON.parse(headers.headers.Software!)).toMatchObject({
            PlatformName: 'Shop',
            ModuleVersion: '2',
            ModuleSupplier: 'Buckaroo',
        });
        expect(JSON.parse(headers.setSoftwareHeader().headers.Software!).PlatformName).toBe('Node SDK');
    });
    test('sends the package.json version as the default platform version', () => {
        const headers = new Headers();
        expect(JSON.parse(headers.headers.Software!).PlatformVersion).toBe(version);
        expect(JSON.parse(headers.setSoftwareHeader().headers.Software!).PlatformVersion).toBe(version);
    });
});
