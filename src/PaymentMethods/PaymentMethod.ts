import Api, { BuckarooClient } from '../BuckarooClient'
import Services from "../Models/Services";
import PayForm from "../Models/PayForm";
import Transaction from "../Models/Transaction";

export default class PaymentMethod {
  private readonly _api: BuckarooClient = Api
  public paymentName: string = ''
  public serviceVersion: number = 0
  private readonly _requiredConfigFields: string[] = ['currency', 'pushURL']
  protected payLoad: any

  get api (): BuckarooClient {
    if (typeof this._api !== 'undefined') {
      return this._api
    }
    throw new Error('Buckaroo Client not set!')
  }

  get requiredFields (): string[] {
    return this._requiredConfigFields
  }
  async pay (data,PayModel): Promise<any> {
    const services = new Services(this.paymentName, this.serviceVersion, 'Pay', PayModel)

    const PayLoad = new PayForm(data, services)
    await this.api.client.post(
      new Transaction(this,PayLoad),
      this.api.client.getTransactionUrl()
    )
  }
}
