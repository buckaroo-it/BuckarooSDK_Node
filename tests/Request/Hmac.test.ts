import { Hmac } from '../../src';

const credentials = { websiteKey: 'test-store', secretKey: 'test-secret' };
const url = 'https://testcheckout.buckaroo.nl/json/Transaction';
const body = '{"AmountDebit":10,"Currency":"EUR"}';

describe('Testing HMAC', () => {
    test('matches an independently calculated SHA256/MD5 vector', () => {
        const hmac = new Hmac();
        hmac.url = url;
        hmac.data = body;
        hmac.method = 'POST';
        expect(hmac.generate(credentials, 'test-nonce', '1767268800')).toBe(
            'hmac test-store:U6hJjO60YbXetTom7+okFkAwY9sIbPitYqUk5cjFIOw=:test-nonce:1767268800'
        );
    });

    test.each([
        ['body', url, '{"AmountDebit":20,"Currency":"EUR"}', 'POST', credentials],
        ['URL', url + '/other', body, 'POST', credentials],
        ['method', url, body, 'GET', credentials],
        ['store', url, body, 'POST', { ...credentials, websiteKey: 'other' }],
        ['secret', url, body, 'POST', { ...credentials, secretKey: 'other' }],
    ])('rejects a changed %s', (_, target, data, method, keys) => {
        const signer = new Hmac();
        signer.url = url;
        signer.data = body;
        const header = signer.generate(credentials, 'test-nonce', '1767268800');
        expect(new Hmac().validate(keys, header, target, data, method)).toBe(false);
    });

    test('signs GET requests without a body', () => {
        const hmac = new Hmac();
        hmac.url = url;
        hmac.method = 'GET';
        const header = hmac.generate(credentials, 'nonce', '1767268800');
        expect(new Hmac().validate(credentials, header, url, '{}', 'GET')).toBe(true);
    });
});
