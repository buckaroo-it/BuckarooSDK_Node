import { IConfig, ICredentials } from './Utils/Types';
import HttpsClient from './Request/HttpsClient';
import { Agent } from 'https';
import getMethod, { MethodFromServiceCode, ServiceCode } from './Utils/MethodTypes';
import Request from './Request/Request';
import NoService from './PaymentMethods/NoService';
import TransactionService from './Services/TransactionService';
import { Credentials } from './Handlers/Credentials';

export default class Buckaroo {
    private static _client: Buckaroo;
    private readonly _credentials: Credentials;
    private readonly _httpClient: HttpsClient;
    private _config: IConfig;

    constructor(credentials: ICredentials, config?: IConfig, agent?: Agent) {
        this._credentials = new Credentials(credentials.secretKey, credentials.websiteKey);
        this._config = { ...(config ?? { mode: 'TEST', currency: 'EUR' }) };
        this._httpClient = new HttpsClient(agent);
    }

    static get Client(): Buckaroo {
        return this._client;
    }

    get config(): IConfig {
        return { ...this._config };
    }

    set config(value: IConfig) {
        this._config = value;
    }

    get credentials(): ICredentials {
        return this._credentials;
    }

    get httpClient() {
        return this._httpClient;
    }

    get batch() {
        return {
            transaction: Request.BatchTransaction,
            data: Request.BatchDataRequest,
        };
    }

    static InitializeClient(credentials: ICredentials, config?: IConfig, agent?: Agent): Buckaroo {
        return (this._client = new this(credentials, config, agent));
    }

    confirmCredentials() {
        return this._credentials.confirm();
    }

    transaction(key: string) {
        return new TransactionService(key);
    }

    method(): NoService;
    method<Name extends ServiceCode>(name: Name): MethodFromServiceCode<Name>;
    method(name?: ServiceCode) {
        if (!name) {
            return new NoService();
        }
        return getMethod(name);
    }
}


export { Buckaroo };
