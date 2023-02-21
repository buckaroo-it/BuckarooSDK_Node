import { IConfig, ICredentials } from './Utils/Types'
import { Config } from "./Request/Config";

export class BuckarooClient {
    private readonly _config: Config
    get config (): Config {
        return this._config
    }

    constructor (credentials?: ICredentials, config?: IConfig ) {
        this._config = new Config()
        this._config.setConfig(config)
        this._config.setCredentials(credentials)
    }
}

export default BuckarooClient
