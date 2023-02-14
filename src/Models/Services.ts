import Parameters from './Parameters'

class serviceList {
  parameters?: Array<{}>
  name: string
  version: number
  action: string
  constructor (paymentName: string, serviceVersion: number, action: string, modelObject: {}) {
    this.addParameters(modelObject)
    this.name = paymentName
    this.version = serviceVersion
    this.action = action
  }

  addParameters (modelObject) {
    if (modelObject && Object.keys(modelObject).length > 0) {
      this.parameters = new Parameters().addParameterList(modelObject)
    } else {
      delete this.parameters
    }
  }
}

export default class Services {
  ServiceList: serviceList[] = []

  constructor (paymentName, serviceVersion, action, pay) {
    this.addServiceList(paymentName, serviceVersion, action, pay)
  }

  addServiceList (paymentName, serviceVersion, action, pay) {
    this.ServiceList.push(
      new serviceList(paymentName, serviceVersion, action, pay)
    )
    return this
  }
}
