import { IConfig, ICredentials } from './Utils/Types'
import { BuckarooClient } from './Request/BuckarooClient'

export function initializeBuckarooClient(credentials: ICredentials, config: IConfig) {
    return BuckarooClient.initialize(credentials, config)
}
