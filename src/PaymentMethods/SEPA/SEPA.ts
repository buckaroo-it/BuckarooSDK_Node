import PaymentMethod from '../PaymentMethod'
import BuckarooClient from '../../BuckarooClient'
import Transaction from '../../Models/Transaction'
import Pay from './Models/Pay'
import ExtraInfo from './Models/ExtraInfo'
import Refund from './Models/Refund'
import PayRecurrent from './Models/PayRecurrent'

export default class SEPA extends PaymentMethod {
  protected requiredConfigFields: string[] = []
  public serviceVersion = 1
  constructor (api: BuckarooClient) {
    super(api)
    this.paymentName = 'SepaDirectDebit'
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

  async refund (model?) {
    await this.api.client.post(
      new Transaction(model, this, 'Refund', new Refund()),
      this.api.client.getTransactionUrl()
    )
  }

  async payRecurrent (model?) {
    await this.api.client.post(
      new Transaction(model, this, 'PayRecurrent', new PayRecurrent()),
      this.api.client.getTransactionUrl()
    )
  }

  async authorize (model?) {
    await this.api.client.post(
      new Transaction(model, this, 'Authorize', new Pay()),
      this.api.client.getTransactionUrl()
    )
  }

  async extraInfo (model?) {
    await this.api.client.post(
      new Transaction(model, this, 'Pay,ExtraInfo', new ExtraInfo()),
      this.api.client.getTransactionUrl()
    )
  }

  async payWithEmandate (model?) {
    await this.api.client.post(
      new Transaction(model, this, 'PayWithEmandate', new Pay()),
      this.api.client.getTransactionUrl()
    )
  }
}
