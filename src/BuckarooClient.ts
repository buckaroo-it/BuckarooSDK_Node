import { IConfig, ICredentials } from './Utils/Types'
import { Client } from './Request/Client'

export function initializeBuckarooClient(credentials: ICredentials, config: IConfig) {

    return Client.initialize(credentials, config)
}
