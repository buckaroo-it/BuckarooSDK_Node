import { initializeBuckarooClient, buckarooClient } from '../src/BuckarooClient'

initializeBuckarooClient();


(async () => {
    try {
        const client = await buckarooClient().client().specification('ideal', 1)
        console.log(client)
    } catch (error) {
        console.warn(error)
    }
})();
