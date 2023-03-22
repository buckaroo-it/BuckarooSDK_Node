import { initializeBuckarooClient, buckarooClient } from '../src/BuckarooClient'

initializeBuckarooClient()

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