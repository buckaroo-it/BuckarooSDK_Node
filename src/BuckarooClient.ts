import PaymentMethod from "./methods/paymentMethod";
import Config from "./request/config";
import HttpClient from "./request/client";
import Ideal from "./methods/ideal";
import Klarna from "./methods/klarna";
const payments: {} = {
  ideal: Ideal,
  klarna: Klarna,
};

export default class BuckarooClient {
  private _client: HttpClient;
  private readonly _config: Config;
  get config(): Config {
    return this._config;
  }
  get client(): HttpClient {
    return this._client;
  }
  constructor(websiteKey?, secretKey?) {
    this._config = new Config(websiteKey, secretKey);
    this._client = new HttpClient(this._config);
  }
  method(methodName) {
    return new payments[methodName]();
  }
}
