import PaymentMethod from '../PaymentMethod'
import BuckarooClient from '../../BuckarooClient'
import Transaction from '../../Models/Transaction'
import Pay from './Models/Pay'

export default class Payconiq extends PaymentMethod {
  protected requiredConfigFields: string[] = []

  constructor (api: BuckarooClient) {
    super(api)
    this.paymentName = 'payconiq'
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
}
