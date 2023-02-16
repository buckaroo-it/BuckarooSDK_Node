import PayForm from "../Models/PayForm";
import api from "../index";

export default class PaymentMethod {

  public paymentName: string = ''
  public serviceVersion: number = 0
  private _requiredFields: string[] = ['currency', 'pushURL']
  get requiredFields(): string[] {
    return this._requiredFields;
  }
  set requiredFields(value: string[]) {
    this._requiredFields = value;
  }

  constructor(paymentName,serviceVersion?,requiredFields?) {
    this.paymentName = paymentName
    this.serviceVersion = serviceVersion || this.serviceVersion
    if (Array.isArray(requiredFields)){
      this._requiredFields = this._requiredFields.concat(requiredFields)
    }
  }


  async pay (data,PayModel?,action = 'Pay'): Promise<any> {
    const Transaction = new PayForm(data).
    setServices(this.paymentName, this.serviceVersion, action, PayModel)
    for (const dataKey of this._requiredFields) {
      Transaction[dataKey] = data[dataKey] || api.config[dataKey] || ''
    }
    console.log(Transaction);
    return await api.client.post(
      Transaction,
      api.client.getTransactionUrl()
    )
  }
}