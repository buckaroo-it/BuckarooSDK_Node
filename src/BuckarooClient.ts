import { IConfig, ICredentials } from './Utils/Types'

import { Config } from "./Request/Config";
import { Client } from "./Request/Client";

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
    }

    constructor (credentials?: ICredentials, config?: IConfig) {
        this._config = new Config()
        this._config.setConfig(config)
        this._config.setCredentials(credentials)
        this._client = new Client()
    }
}

export default BuckarooClient
