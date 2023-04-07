import buckarooClient, { initializeBuckarooClient } from '../src/BuckarooClient'

export default initializeBuckarooClient(
    { secretKey: 'secretKey', websiteKey: 'websiteKey' },
    {
        mode: 'test',
        currency: 'EUR',
        pushURL: process.env.BPE_PUSH_URL || '',
        returnURL: process.env.BPE_RETURN_URL || '',
        returnURLCancel: process.env.BPE_RETURN_URL_CANCEL || '',
        baseUrl: process.env.BPE_BASE_URL || ''
    }
)
async function getSpecificationsOfIdeal() {
    return await buckarooClient()
        .specification('ideal', 1)
        .then((res)=>{
            expect(res).toBeDefined()
        })
}
// getSpecificationsOfIdeal().then((response) => {
//     console.log(response)
// })
