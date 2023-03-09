import { initializeBuckarooClient, buckarooClient } from '../src/BuckarooClient'
initializeBuckarooClient()
;(async () => {
    try {
        // const client = buckarooClient().client().specification()
    } catch (error) {
        console.warn(error)
    }
})()
