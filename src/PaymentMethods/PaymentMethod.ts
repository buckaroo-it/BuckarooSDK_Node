import BuckarooClient from "../BuckarooClient";

export default class PaymentMethod {
  private readonly _api: BuckarooClient;
  public paymentName: string = "";
  public serviceVersion: number = 0;
  private _requiredConfigFields: string[] = ["currency", "pushURL"];
  protected payLoad: any;

  constructor(api: BuckarooClient) {
    this._api = api;
  }
  get api(): BuckarooClient {
    return this._api;
  }
  get requiredFields(): string[] {
    return this._requiredConfigFields;
  }
  setPayLoad(model){
    this.payLoad = model
  }
}
