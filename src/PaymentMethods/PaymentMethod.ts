import Services from "../Models/Services";
import PayForm from "../Models/PayForm";
import Transaction from "../Models/Transaction";
import api from "../index";

export default class PaymentMethod {
  public paymentName: string = ''
  public serviceVersion: number = 0
  private readonly _requiredConfigFields: string[] = ['currency', 'pushURL']
  protected payLoad: any


  get requiredFields (): string[] {
    return this._requiredConfigFields
  }
  async pay (data,PayModel): Promise<any> {
    const services = new Services(this.paymentName, this.serviceVersion, 'Pay', PayModel)

    const PayLoad = new PayForm(data, services)
    return await api.client.post(
      new Transaction(this,PayLoad),
      api.client.getTransactionUrl()
    )
  }
}
