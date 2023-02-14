import BuckarooClient from '../../BuckarooClient'
import Transaction from '../../Models/Transaction'
import PaymentMethod from '../PaymentMethod'
import Pay from './Models/Pay'
import ExtraInfo from './Models/ExtraInfo'

export default class Paypal extends PaymentMethod {
  protected requiredConfigFields: string[] = []

  constructor (api: BuckarooClient) {
    super(api)
    this.paymentName = 'paypal'
    this.requiredConfigFields = this.requiredFields.concat(
      this.requiredConfigFields
    )
  }

  async pay (model?) {
    await this.api.client.post(
      new Transaction(model, this, 'Pay', new Pay()),
      this.api.client.getTransactionUrl()
    )
  }

  async payRecurrent (model?) {
    await this.api.client.post(
      new Transaction(model, this, 'PayRecurrent', new Pay()),
      this.api.client.getTransactionUrl()
    )
  }

  async extraInfo (model?) {
    await this.api.client.post(
      new Transaction(model, this, 'Pay,ExtraInfo', new ExtraInfo()),
      this.api.client.getTransactionUrl()
    )
  }
}
