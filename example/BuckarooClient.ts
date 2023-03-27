import { initializeBuckarooClient, buckarooClient } from '../src/BuckarooClient'

initializeBuckarooClient({secretKey:'secretKey', websiteKey:'websiteKey'},
    {
        mode:'test',
        currency:'EUR',
        pushURL:process.env.BPE_PUSH_URL || '',
        returnURL:process.env.BPE_RETURN_URL || '',
        returnURLCancel:process.env.BPE_RETURN_URL_CANCEL || ''
    })

;(async () => {
    try {
        const client = await buckarooClient().specification('ideal', 1)
        console.log(client)
    } catch (error) {
        console.warn(error)
    }
})()
;(async () => {
    try {
        const client = await buckarooClient().ideal.pay()
        console.log(client)
    } catch (error) {
        console.warn(error)
    }
})()
