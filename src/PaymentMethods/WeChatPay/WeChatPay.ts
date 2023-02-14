import PaymentMethod from '../PaymentMethod'
import BuckarooClient from '../../BuckarooClient'
import Transaction from '../../Models/Transaction'
import Pay from './Models/Pay'

export default class WeChatPay extends PaymentMethod {
  protected requiredConfigFields: string[] = []
  public serviceVersion = 1
  constructor (api: BuckarooClient) {
    super(api)
    this.paymentName = 'WeChatPay'
    this.requiredConfigFields = this.requiredConfigFields.concat(
      this.requiredFields
    )
  }

  async pay (model?) {
    await this.api.client.post(
      new Transaction(model, this, 'Pay', new Pay()),
      this.api.client.getTransactionUrl()
    )
  }
}
