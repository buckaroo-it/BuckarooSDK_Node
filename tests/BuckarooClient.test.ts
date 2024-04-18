import Buckaroo from '../src';

require('dotenv').config();

const BuckarooClient = Buckaroo.InitializeClient(
    {
        secretKey: process.env.BPE_SECRET_KEY || '',
        websiteKey: process.env.BPE_WEBSITE_KEY || '',
    },
    {
        mode: process.env.BPE_MODE === 'LIVE' ? 'LIVE' : 'TEST',
        currency: process.env.BPE_CURRENCY_CODE || 'EUR',
        returnURL: process.env.BPE_RETURN_URL || '',
        returnURLCancel: process.env.BPE_RETURN_URL_CANCEL || '',
        pushURL: process.env.BPE_PUSH_URL || '',
    }
);
export default BuckarooClient;
