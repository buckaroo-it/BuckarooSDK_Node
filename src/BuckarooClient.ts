import Config from './Request/Config'
import Client from './Request/Client'
import { IConfig, ICredentials } from './Utils/Types'
import { config } from 'dotenv'
config({ path: '../.env' })

export class BuckarooClient {
  private _client: Client
  private _config: Config
  get config (): Config {
    return this._config
  }

  get client (): Client {
    return this._client
  }

  set config (value: Config) {
    this._config = value
    this._client = new Client(this._config)
  }

  constructor (credentials?: ICredentials, config?: IConfig) {
    this._config = new Config(credentials, config)
    this._client = new Client(this._config)
  }
}
const Api = new BuckarooClient()
export default Api
