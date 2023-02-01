import * as https from "https";
import Endpoints from "../Constants/Endpoints";
import Config from "./Config";
import Hmac from "./Hmac";

export default class HttpClient {
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

  async call(data, method): Promise<any> {
    const options = this.getOptions(data, method);
    throw new Error("Not implemented");
    return new Promise(function (resolve, reject) {
      const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log("headers: ", res.headers);
        res.on("data", (d) => {
          process.stdout.write(d);
        });
      });
      req.on("error", (error) => {
        console.error(error, "error");
      });

      req.write(options.data);
      req.end();
    });
  }
}
