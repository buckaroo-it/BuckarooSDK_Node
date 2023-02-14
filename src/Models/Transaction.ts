import PaymentMethod from '../PaymentMethods/PaymentMethod'
import Model from './Model'

export default class Transaction extends Model {
  constructor (method: PaymentMethod,payload) {
    super()
    this.setProperties(method,payload)
  }

  setProperties (method,payload) {
    for (const datum of method.requiredConfigFields) {
      this[datum] = method.api.config[datum] ? method.api.config[datum] : ''
    }
    for (const key in payload) {
      if(typeof payload[key] !== 'function') {
        this[key] = payload[key]
      }
    }
  }
}
