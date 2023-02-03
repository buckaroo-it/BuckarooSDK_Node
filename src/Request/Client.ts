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
  getHeaders(method, data,url) {
    return {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: "hmac " + new Hmac(this._config,url).generate(method, data),
      Culture: "en-GB",
    };
  }
  getOptions(data, method,url) {
    url = new URL(url);
    return  {
      hostname: url.host,
      path: url.pathname + url.search,
      method: method,
      headers: this.getHeaders(method, data, url.href),
      data: data
    };
  }
  getEndpoint(path: string) {
    let baseUrl = this._config?.isLiveMode() ? Endpoints.LIVE : Endpoints.TEST;

    return baseUrl + path;
  }
  getTransactionUrl(): string {
    return this.getEndpoint("json/Transaction");
  }
  getSpecificationUrl(paymentName,serviceVersion){
    return this.getEndpoint(
        `json/Transaction/Specification/${paymentName}?serviceVersion=${serviceVersion}`
    );

  }
  async get(data,url) {
    this.call(data, HttpMethods.METHOD_GET,url).then((r) => r);
  }

  async post(data,url) {
    this.call(data, HttpMethods.METHOD_POST,url).then((r) => r);
  }
  async specification(data?: {}, paymentName?: string, serviceVersion = 0): Promise<any> {
    const endPoint = this.getSpecificationUrl(paymentName,serviceVersion)
    return  this.call(data,HttpMethods.METHOD_GET,endPoint);
  }
  async call(data, method,url) {
    if(typeof data==='object' && Object.keys(data).length===0){
      data = '';
    }
    const options = this.getOptions(data, method,url);
    console.log(options)
    return new HttpClient().call(options);
  }
}
