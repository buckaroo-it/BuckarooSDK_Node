import PaymentMethod from "./methods/paymentMethod";
import Config from "./request/config";
import HttpClient from "./request/client";

export default class BuckarooClient {
    private _client: HttpClient;
    private readonly _config: Config;
    get config(): Config {
        return this._config;
    }
    get client(): HttpClient {
        return this._client;
    }
    constructor(websiteKey,secretKey) {
        this._config = new Config(websiteKey, secretKey);
        this._client = new HttpClient(this._config);
    }

    method(paymentMethod: PaymentMethod){
        return  paymentMethod;
    }



}