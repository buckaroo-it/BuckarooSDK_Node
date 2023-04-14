import { IConfig, ICredentials } from './Utils/Types'
import { Client } from './Request/Client'

let _client: Client
export function initializeBuckarooClient(credentials: ICredentials, config?: IConfig) {
    if (!_client) {
        _client = Client.initialize(credentials, config)
    }
    return _client
}
const BuckarooClient = () => (_client instanceof Client ? _client : Client.initialize())
export default BuckarooClient
