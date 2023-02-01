import * as https from "https";
import { Console } from "inspector";
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
    console.log(this.getHeaders(method, data));
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

  async call(options: {
    hostname?: string;
    path: string;
    method: string;
    headers: {};
    data?: string;
  }): Promise<any> {
    return new Promise(function (resolve, reject) {
      const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log("headers: ", res.headers);
        let body = "";
        res.on("data", (chunk) => {
          process.stdout.write(chunk);
          try {
            body = JSON.parse(Buffer.concat([chunk]).toString());
          } catch (e) {
            reject(e);
          }
        });
        res.on("end", function () {
          resolve(body);
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
