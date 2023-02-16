import PaymentMethod from '../PaymentMethod'
import Pay, { IPay } from './Models/Pay'
import api from "../../index";

class Ideal extends PaymentMethod {
  protected requiredConfigFields: string[] = [
    'currency',
    'returnURL',
    'returnURLCancel',
    'pushURL'
  ]

  async issuers (): Promise<any> {
    const issuerList: Array<{ id: any, name: any }> = []
    return await api.client
        .specification({}, this.paymentName, 2)
        .then((response) => {
          if (
            response.data?.Actions?.['0']?.RequestParameters?.[0]?.ListItemDescriptions
          ) {
            const issuersData =
              response.data.Actions['0'].RequestParameters[0].ListItemDescriptions
            if (issuersData.length > 0) {
              for (const issuer of issuersData) {
                issuerList.push({
                  id: issuer.Value,
                  name: issuer.Description
                })
              }
            }
            response.data = issuersData
          }
          return response
        })
  }
}

const ideal = new Ideal('ideal')
const pay = (data:IPay) => ideal.pay(data,new Pay(data));
const payRemainder = (data:IPay)  => ideal.pay(data,new Pay(data),'PayRemainder')
const issuers = () => ideal.issuers();

export {
  pay,
  issuers,
  payRemainder
}