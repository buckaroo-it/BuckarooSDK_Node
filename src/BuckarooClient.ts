import { IConfig, ICredentials } from './Utils/Types'
import Client from './Request/Client'

let _client: Client

export const initializeBuckarooClient = (credentials: ICredentials, config: IConfig) => {
    if (!_client) _client = Client.initialize(credentials, config)
    return {
        credentials,
        config
    }
}

export const buckarooClient = () => _client
