import Buckaroo from '../../src';

export const credentials = { websiteKey: 'compat-store', secretKey: 'synthetic-secret' };

export function initialize(websiteKey = credentials.websiteKey) {
    const client = Buckaroo.InitializeClient({ ...credentials, websiteKey }, { mode: 'TEST', currency: 'EUR' });
    const send = jest
        .spyOn(client.httpClient, 'sendRequest')
        .mockResolvedValue({ httpResponse: { status: 200 }, data: {} } as any);
    return { client, send };
}
