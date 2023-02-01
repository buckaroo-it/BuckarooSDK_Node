import PaymentMethod from "./PaymentMethods/PaymentMethod";
import Config from "./Request/Config";
import HttpClient from "./Request/HttpClient";
import Ideal from "./PaymentMethods/Ideal/Ideal";
import Klarna from "./PaymentMethods/Klarna/Klarna";
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
