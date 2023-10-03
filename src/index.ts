import { IConfig, ICredentials } from './Utils/Types'
import HttpsClient from './Request/HttpsClient'
import { Agent } from 'https'
import getMethod, { MethodFromServiceCode, ServiceCode } from './Utils/MethodTypes'
import Request from './Request/Request'
import NoService from './PaymentMethods/NoService'
import TransactionService from './Services/TransactionService'
import { Credentials } from './Handlers/Credentials'
export default class Buckaroo {
    private readonly _credentials: Credentials
    private _config: IConfig
    private readonly _httpClient: HttpsClient
    private static _client: Buckaroo
    constructor(credentials: ICredentials, config?: IConfig, agent?: Agent) {
        this._credentials = new Credentials(credentials.secretKey, credentials.websiteKey)
        this._config = { ...(config ?? { mode: 'TEST', currency: 'EUR' }) }
        this._httpClient = new HttpsClient(agent)
    }
    static InitializeClient(credentials: ICredentials, config?: IConfig, agent?: Agent) {
        this._client = new this(credentials, config, agent)
        return this.Client
    }
    static get Client(): Buckaroo {
        if (this._client) {
            return this._client
        }
        throw new Error('Buckaroo client not initialized')
    }
    get credentials(): ICredentials {
        return this._credentials
    }
    confirmCredentials() {
        return this._credentials.confirm()
    }
    get config(): IConfig {
        return { ...this._config }
    }
    set config(value: IConfig) {
        this._config = value
    }
    get httpClient() {
        return this._httpClient
    }
    transaction(key: string) {
        return new TransactionService(key)
    }
    get batch() {
        return Request.BatchTransaction
    }
    method(): NoService
    method<Name extends ServiceCode>(name: Name): MethodFromServiceCode<Name>
    method(name?: ServiceCode) {
        if (!name) {
            return new NoService()
        }
        return getMethod(name)
    }
}
