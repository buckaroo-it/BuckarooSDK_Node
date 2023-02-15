import PaymentMethod from '../PaymentMethod'
import Transaction from '../../Models/Transaction'
import Pay, { IPay } from './Models/Pay'
import PayForm from '../../Models/PayForm'
import Services from '../../Models/Services'
import api from "../../index";

class Ideal extends PaymentMethod {
  protected requiredConfigFields: string[] = [
    'currency',
    'returnURL',
    'returnURLCancel',
    'pushURL'
  ]

  constructor () {
    super()
    this.paymentName = 'ideal'
    this.requiredConfigFields = this.requiredFields.concat(
      this.requiredConfigFields
    )
  }
  async pay(data:IPay): Promise<any> {
      return await super.pay(data,new Pay(data));
  }

  async payRemainder (data?): Promise<any> {
    const services = new Services(this.paymentName, this.serviceVersion, 'PayRemainder', new Pay(data))
    const PayLoad = new PayForm(data, services)
    const TransactionData = new Transaction(this, PayLoad)
    await api.client.post(
      TransactionData,
      api.client.getTransactionUrl()
    )
  }

  async issuers (): Promise<any> {
    const issuerList: Array<{ id: any, name: any }> = []
    return await api.client
        .specification({}, this.paymentName, 2)
        // .then((response) => {
        //   if (
        //     response.Actions?.['0']?.RequestParameters?.[0]?.ListItemDescriptions
        //   ) {
        //     const issuersData =
        //       response.Actions['0'].RequestParameters[0].ListItemDescriptions
        //     if (issuersData.length > 0) {
        //       for (const issuer of issuersData) {
        //         issuerList.push({
        //           id: issuer.Value,
        //           name: issuer.Description
        //         })
        //       }
        //     }
        //     return response
        //   }
        // })
  }
}

const ideal = new Ideal()
const pay = ideal.pay.bind(ideal);
const issuers = ideal.issuers.bind(ideal);

export {
  pay,
  issuers,
}