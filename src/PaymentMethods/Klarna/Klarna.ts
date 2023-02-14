import PaymentMethod from '../PaymentMethod'
import Pay, { IPay } from './Models/Pay'

export class Klarna extends PaymentMethod {
  public requiredConfigFields: string[]
  constructor () {
    super()
    this.paymentName = 'klarna'
    this.requiredConfigFields = this.requiredFields
  }
  async pay(data:IPay): Promise<any> {
    return super.pay(data,new Pay(data));
  }

  // payInInstallments(model?) {
  //   return this.api.client.post(
  //     new PayPayload(model, this, "PayInInstallments", new Pay()),
  //     this.api.client.getTransactionUrl()
  //   );
  // }
  issuers (): any {
    return this
  }
}



const klarna = new Klarna()
const pay = klarna.pay.bind(klarna);

export {
  pay,
}