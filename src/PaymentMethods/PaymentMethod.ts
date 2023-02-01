import BuckarooClient from "../BuckarooClient";
import Endpoints from "../Constants/Endpoints";

export default class PaymentMethod {
  private readonly _api: BuckarooClient;
  public paymentName: string = "";
  public serviceVersion: number = 0;

  private _requiredConfigFields: string[] = ["currency", "pushURL"];
  get requiredFields(): string[] {
    return this._requiredConfigFields;
  }
  getServiceVersion(): number {
    return this.serviceVersion;
  }

  constructor(api: BuckarooClient) {
    this._api = api;
  }
  get api(): BuckarooClient {
    return this._api;
  }

  getEndpoint(path: string): string {
    let baseUrl = this.api.config?.isLiveMode()
      ? Endpoints.LIVE
      : Endpoints.TEST;

    return baseUrl + path;
  }

  setServiceVersion(version: number) {
    this.serviceVersion = version;
    return this;
  }
}
