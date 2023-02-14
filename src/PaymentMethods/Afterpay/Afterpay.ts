import PaymentMethod from '../PaymentMethod'
// import Pay from './Models/Pay'
import Pay from '../Klarna/Models/Pay'
import { IPay } from "../Klarna/Models/Pay";

export class Afterpay extends PaymentMethod {
  protected requiredConfigFields: string[] = []

  constructor() {
    super();
    this.paymentName = "afterpay"
    this.requiredConfigFields = this.requiredFields.concat(
      this.requiredConfigFields
    )
  }
  async pay(data:IPay): Promise<any> {
    return super.pay(data,new Pay(data));
  }

}

const afterpay = new Afterpay()
export default afterpay