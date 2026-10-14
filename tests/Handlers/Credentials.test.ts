import { Agent } from 'https';
import Buckaroo, { Credentials, Hmac, HttpsClient } from '../../src';
import { credentials, initialize } from '../Support/Client';

describe('Testing credentials', () => {
    test('direct confirmation retains LIVE mode, timeout and custom transport', async () => {
        const agent = new Agent();
        const client = Buckaroo.InitializeClient(credentials, { mode: 'LIVE', currency: 'EUR', timeout: 1234 }, agent);
        const send = jest
            .spyOn(client.httpClient, 'sendRequest')
            .mockResolvedValue({ httpResponse: { status: 200 } } as any);
        const otherTransport = jest
            .spyOn(HttpsClient.prototype, 'sendRequest')
            .mockRejectedValue(new Error('wrong transport'));
        const direct = new Credentials(credentials.secretKey, credentials.websiteKey);
        expect(await direct.confirm()).toBe(true);
        expect(send).toHaveBeenCalledTimes(1);
        expect(send.mock.calls[0][0].hostname).toBe('checkout.buckaroo.nl');
        expect(otherTransport).not.toHaveBeenCalled();
        agent.destroy();
    });
    test('retained credential objects keep their settings and sign their own keys', async () => {
        const owner = Buckaroo.InitializeClient(credentials, { mode: 'LIVE', currency: 'EUR', timeout: 1234 });
        const send = jest
            .spyOn(owner.httpClient, 'sendRequest')
            .mockResolvedValue({ httpResponse: { status: 200 } } as any);
        const ownKeys = { websiteKey: 'standalone-store', secretKey: 'standalone-secret' };
        const direct = new Credentials(ownKeys.secretKey, ownKeys.websiteKey);
        const other = initialize('another-store');
        expect(await direct.confirm()).toBe(true);
        const [url, data, options] = send.mock.calls[0];
        expect(url.hostname).toBe('checkout.buckaroo.nl');
        expect(
            new Hmac().validate(
                ownKeys,
                options.headers!.Authorization!,
                url.toString(),
                JSON.stringify(data),
                options.method!
            )
        ).toBe(true);
        expect(
            new Hmac().validate(
                credentials,
                options.headers!.Authorization!,
                url.toString(),
                JSON.stringify(data),
                options.method!
            )
        ).toBe(false);
        expect(other.send).not.toHaveBeenCalled();
    });
});
