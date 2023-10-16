import {IConfig, ICredentials} from './Utils/Types'
import HttpsClient from './Request/HttpsClient'
import {Agent} from 'https'
import {getMethod, PaymentMethodInstance, ServiceCode} from './Utils/MethodTypes'
import Request from './Request/Request'
import NoService from './PaymentMethods/NoService'
import TransactionService from './Services/TransactionService'
import {Credentials} from './Handlers/Credentials'
import {RequestTypes} from "./Constants/Endpoints";

export default class Buckaroo {
    private readonly _credentials: Credentials;
    private _config: IConfig;
    private readonly _httpClient: HttpsClient;
    private static _client: Buckaroo;
    constructor(credentials: ICredentials, config?: IConfig, agent?: Agent) {
        this._credentials = new Credentials(credentials.secretKey, credentials.websiteKey)
        this._config = { ...(config ?? { mode: 'TEST', currency: 'EUR' }) }
        this._httpClient = new HttpsClient()
    }
    static InitializeClient(credentials: ICredentials, config?: IConfig, agent?: Agent): Buckaroo {
        return (this._client = new this(credentials, config, agent));
    }
    static get Client(): Buckaroo {
        return this._client;
    }
    get credentials(): ICredentials {
        return this._credentials;
    }
    confirmCredentials() {
        return this._credentials.confirm();
    }
    get config(): IConfig {
        return { ...this._config };
    }
    set config(value: IConfig) {
        this._config = value;
    }
    get httpClient() {
        return this._httpClient;
    }
    transaction(key: string) {
        return new TransactionService(key);
    }
    get batch() {
        return {
            transaction: Request.BatchTransaction,
            data: Request.BatchDataRequest,
        };
    }
    method(): NoService
    method<K extends ServiceCode>(name: K): PaymentMethodInstance<K>
    method<K extends ServiceCode>(name?: K) {
        if (!name) {
            return new NoService();
        }
        return getMethod(name);
    }
}


export { Buckaroo };