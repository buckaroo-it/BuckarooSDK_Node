import { initializeBuckarooClient } from '../src/BuckarooClient'
require('dotenv').config()
export default initializeBuckarooClient(
    {
        secretKey: process.env.BPE_SECRET_KEY || '',
        websiteKey: process.env.BPE_WEBSITE_KEY || ''
    },
    {
        mode: process.env.BPE_MODE === 'live' ? 'live' : 'test',
        currency: process.env.BPE_CURRENCY_CODE || 'EUR',
        returnURL: process.env.BPE_RETURN_URL || '',
        returnURLCancel: process.env.BPE_RETURN_URL_CANCEL || '',
        pushURL: process.env.BPE_PUSH_URL || ''
    }
)
