import PaymentMethod from '../PaymentMethod'
import BuckarooClient from '../../BuckarooClient'
import Verify from './Models/Verify'

export default class Surepay extends PaymentMethod {
  protected requiredConfigFields: string[] = []
  constructor (api: BuckarooClient) {
    super(api)
    this.paymentName = 'surepay'
    this.requiredConfigFields = this.requiredConfigFields.concat(
      this.requiredFields
    )
  }

  async verify (model?) {
    await this.api.client.post(
      // new Payload().setServices(
      // model,
      // this.paymentName,
      // this.serviceVersion,
      // "verify",
      // new Verify()
      {},
      this.api.client.getDataRequestUrl())
  }
}
