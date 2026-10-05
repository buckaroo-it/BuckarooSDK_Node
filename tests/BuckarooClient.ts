import Buckaroo from '../src';

const client = Buckaroo.InitializeClient(
    { websiteKey: 'test-store', secretKey: 'test-secret' },
    { mode: 'TEST', currency: 'EUR', returnURL: 'https://example.com/return', pushURL: 'https://example.com/push' }
);

export default client;
