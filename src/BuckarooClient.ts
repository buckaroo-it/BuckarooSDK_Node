import Config from "./Request/Config";
import Client from "./Request/Client";
import Ideal from "./PaymentMethods/Ideal/Ideal";
import Klarna from "./PaymentMethods/Klarna/Klarna";
const payments: {} = {
  ideal: Ideal,
  klarna: Klarna,
};

export default class BuckarooClient {
  private _client: Client;
  private readonly _config: Config;
  get config(): Config {
    return this._config;
  }
  get client(): Client {
    return this._client;
  }
  constructor(websiteKey?, secretKey?) {
    this._config = new Config(websiteKey, secretKey);
    this._client = new Client(this._config);
  }
  method(methodName) {
    return new payments[methodName]();
  }
}
