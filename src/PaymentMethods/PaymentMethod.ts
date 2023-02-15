import Services from "../Models/Services";
import PayForm from "../Models/PayForm";
import Transaction from "../Models/Transaction";
import api from "../index";

export default class PaymentMethod {
  public paymentName: string = ''
  public serviceVersion: number = 0
  private _requiredFields: string[] = ['currency', 'pushURL']


  get requiredFields (): string[] {
    return this._requiredFields
  }

  set requiredFields(value: string[]) {
    this._requiredFields = value;
  }

  async pay (data,PayModel?,action = 'Pay'): Promise<any> {
    const services = new Services(this.paymentName, this.serviceVersion, action, PayModel)
    const PayLoad = new PayForm(data, services)
    return await api.client.post(
      new Transaction(this,PayLoad),
      api.client.getTransactionUrl()
    )
  }
}