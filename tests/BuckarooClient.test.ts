import { initializeBuckarooClient } from '../src/BuckarooClient'

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export default initializeBuckarooClient(
    {
        secretKey: process.env.BPE_SECRET_KEY,
        websiteKey: process.env.BPE_WEBSITE_KEY
    },
    {
        mode: process.env.BPE_MODE === 'live' ? 'live' : 'test',
        currency: process.env.BPE_CURRENCY_CODE || 'EUR',
        returnURL: process.env.BPE_RETURN_URL || '',
        returnURLCancel: process.env.BPE_RETURN_URL_CANCEL || '',
        pushURL: process.env.BPE_PUSH_URL || ''
    }
)
