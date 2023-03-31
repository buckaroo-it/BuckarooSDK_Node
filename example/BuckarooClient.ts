import { initializeBuckarooClient, buckarooClient } from '../src/BuckarooClient'

export default initializeBuckarooClient(
    { secretKey: 'secretKey', websiteKey: 'websiteKey' },
    {
        mode: 'test',
        currency: 'EUR',
        pushURL: process.env.BPE_PUSH_URL || '',
        returnURL: process.env.BPE_RETURN_URL || '',
        returnURLCancel: process.env.BPE_RETURN_URL_CANCEL || ''
    }
)
async function getSpecificationsOfIdeal() {
    return await buckarooClient().specification('ideal', 1)
}
// getSpecificationsOfIdeal().then((response) => {
//     console.log(response)
// })
