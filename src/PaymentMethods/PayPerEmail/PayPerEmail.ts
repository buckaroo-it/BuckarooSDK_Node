import PaymentMethod from '../PaymentMethod'
import Transaction from '../../Models/Transaction'
import PaymentInvitation from './Models/PaymentInvitation'

export default class PayPerEmail extends PaymentMethod {
  protected requiredConfigFields: string[] = []
  public serviceVersion = 1
  constructor (api) {
    super(api)
    this.paymentName = 'payperemail'
    this.requiredConfigFields = this.requiredConfigFields.concat(
      this.requiredFields
    )
  }

  async paymentInvitation (model?) {
    await this.api.client.post(
      new Transaction(model, this, 'PaymentInvitation', new PaymentInvitation()),
      this.api.client.getTransactionUrl()
    )
  }
}
