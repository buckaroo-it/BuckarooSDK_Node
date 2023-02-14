import PaymentMethod from '../PaymentMethod'
import Transaction from '../../Models/Transaction'
import Pay, { IPay } from './Models/Pay'
import PayForm from '../../Models/PayForm'
import Services from '../../Models/Services'

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
      return super.pay(data,new Pay(data));
  }

  // async pay (data: IPay): Promise<any> {
  //   const services = new Services(this.paymentName, this.serviceVersion, 'Pay', new Pay(data))
  //   const PayLoad = new PayForm(data, services)
  //   const TransactionData = new Transaction(this, PayLoad)
  //
  //   await this.api.client.post(
  //     new Transaction(this, TransactionData),
  //     this.api.client.getTransactionUrl()
  //   )
  // }

  async payRemainder (data?): Promise<any> {
    const services = new Services(this.paymentName, this.serviceVersion, 'PayRemainder', new Pay(data))
    const PayLoad = new PayForm(data, services)
    const TransactionData = new Transaction(this, PayLoad)
    await this.api.client.post(
      TransactionData,
      this.api.client.getTransactionUrl()
    )
  }

  async issuers (): Promise<any> {
    const issuerList: Array<{ id: any, name: any }> = []
    try {
      await this.api.client
        .specification({}, this.paymentName, 2)
        .then((response) => {
          if (
            response.Actions?.['0']?.RequestParameters?.[0]?.ListItemDescriptions
          ) {
            const issuersData =
              response.Actions['0'].RequestParameters[0].ListItemDescriptions
            if (issuersData.length > 0) {
              for (const issuer of issuersData) {
                issuerList.push({
                  id: issuer.Value,
                  name: issuer.Description
                })
              }
            }
            return issuerList
          }
        })
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

const ideal = new Ideal()
const pay = ideal.pay.bind(ideal);
const issuers = ideal.issuers.bind(ideal);

export {
  pay,
  issuers
}
export default ideal
