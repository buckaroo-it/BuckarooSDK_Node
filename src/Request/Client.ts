import Endpoints from "../Constants/Endpoints";
import Config from "./Config";
import Hmac from "./Hmac";
import HttpClient from "./HttpClient";
import HttpMethods from "../Constants/HttpMethods";
export default class Client {
  private _config: Config;

  constructor(config: Config) {
    this._config = config;
  }
  getHeaders(method, data) {
    return {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: "hmac " + new Hmac(this._config).generate(method, data),
      Culture: "en-GB",
    };
  }
  getOptions(data, method) {
    let url = new URL(this.getTransactionUrl());
    return {
      hostname: url.host,
      path: url.pathname + url.search,
      method: method,
      headers: this.getHeaders(method, data),
      data: JSON.stringify(data),
    };
  }
  getEndpoint(path: string) {
    let baseUrl = this._config?.isLiveMode() ? Endpoints.LIVE : Endpoints.TEST;

    return baseUrl + path;
  }
  getTransactionUrl(): string {
    return this.getEndpoint("json/Transaction");
  }

  get(data) {
    this.call(data, HttpMethods.METHOD_GET).then((r) => r);
  }

  post(data) {
    this.call(data, HttpMethods.METHOD_POST).then((r) => r);
  }

  call(data, method) {
    const options = this.getOptions(data, method);

    return new HttpClient().call(options);
  }
}
